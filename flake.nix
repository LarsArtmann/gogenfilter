{
  description = "gogenfilter — Go source filtering framework";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts = {
      url = "github:hercules-ci/flake-parts";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    systems.url = "github:nix-systems/default";
    md-go-validator = {
      url = "github:LarsArtmann/md-go-validator";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    inputs@{
      self,
      nixpkgs,
      flake-parts,
      treefmt-nix,
      systems,
      md-go-validator,
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = import systems;

      imports = [
        treefmt-nix.flakeModule
      ];

      perSystem =
        {
          config,
          pkgs,
          system,
          ...
        }:
        let
          inherit (pkgs) lib;
          goPkg = pkgs.go_1_26;

          goFiles = lib.fileset.fileFilter (file: file.hasExt "go") ./.;
          src = lib.fileset.toSource {
            root = ./.;
            fileset = lib.fileset.unions [
              ./go.mod
              ./go.sum
              ./testhelpers
              ./testdata
              goFiles
            ];
          };

          mkApp =
            name: runtimeInputs: text:
            let
              script = pkgs.writeShellApplication {
                inherit name runtimeInputs text;
              };
            in
            {
              type = "app";
              program = lib.getExe script;
            };

          pkg = pkgs.buildGoModule {
            pname = "gogenfilter";
            version = self.rev or self.dirtyRev or "dev";
            inherit src;
            go = goPkg;
            vendorHash = "sha256-HSnibRe5YDy3u4qQsO9NzYI3ksVDfYaon7Xua9bjVOw=";
            proxyVendor = true;
            meta = with pkgs.lib; {
              description = "Go struct field filter code generator";
              license = licenses.mit;
              maintainers = [ maintainers.larsartmann ];
              mainProgram = "gogenfilter";
            };
          };

          mdgo = md-go-validator.packages.${system}.default.overrideAttrs (_: {
            vendorHash = "sha256-r2hvS99DCP2DkLrMkRs4lOkvDk2tQI+CGQl89KM4ZBc=";
          });
        in
        {
          treefmt = {
            projectRootFile = "go.mod";
            programs = {
              gofumpt.enable = true;
              goimports.enable = true;
              golines.enable = true;
              nixfmt.enable = true;
            };
          };

          checks.format = config.treefmt.build.check self;
          devShells.default = pkgs.mkShell {
            packages = [
              goPkg
              pkgs.golangci-lint
              pkgs.gofumpt
              pkgs.golines
              pkgs.gopls
              pkgs.gotools
              pkgs.govulncheck
              pkgs.trash-cli
              mdgo
            ];

            GOWORK = "off";

            shellHook = ''
              echo "gogenfilter dev shell — $(go version)"
            '';
          };

          devShells.ci = pkgs.mkShellNoCC {
            packages = [
              goPkg
              pkgs.golangci-lint
            ];

            GOWORK = "off";
          };

          checks = {
            build = pkg;
            test = pkg.overrideAttrs (_: {
              doCheck = true;
            });
          };

          apps = {
            test = mkApp "test" [ goPkg ] ''
              go test ./... -count=1 "$@"
            '';

            test-race = mkApp "test-race" [ goPkg ] ''
              go test ./... -race -count=1 "$@"
            '';

            build = mkApp "build" [ goPkg ] ''
              go build ./...
            '';

            vet = mkApp "vet" [ goPkg ] ''
              go vet ./...
            '';

            lint = mkApp "lint" [ pkgs.golangci-lint ] ''
              golangci-lint run ./...
            '';

            coverage = mkApp "coverage" [ goPkg ] ''
              go test ./... -coverprofile=coverage.out -covermode=atomic "$@"
              go tool cover -func=coverage.out
            '';

            vulncheck = mkApp "vulncheck" [ pkgs.govulncheck ] ''
              govulncheck ./...
            '';

            clean =
              mkApp "clean"
                [
                  goPkg
                  pkgs.trash-cli
                ]
                ''
                  trash-put coverage.out 2>/dev/null || true
                  go clean -testcache
                '';

            validate-docs = mkApp "validate-docs" [ mdgo ] ''
              md-go-validator -f table website/src/content/docs/
            '';
          };
        };

      flake.overlays.default = final: _prev: {
        gogenfilter = self.packages.${final.stdenv.system}.default;
      };

    };
}
