{
  description = "gogenfilter — Go source filtering framework";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    flake-parts = {
      url = "github:hercules-ci/flake-parts";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };

    # go-standard (flakeModules.go-standard) composes treefmt-nix + systems
    # internally — this repo no longer declares them as direct inputs.
    go-nix-helpers = {
      url = "github:LarsArtmann/go-nix-helpers";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    md-go-validator = {
      url = "github:LarsArtmann/md-go-validator";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    inputs@{
      self,
      flake-parts,
      md-go-validator,
      ...
    }:
    let
      lib = inputs.nixpkgs.lib;

      # Same fileset the hand-rolled package used: Go sources minus ./plugin,
      # plus the module manifests, test fixtures, and README.
      goFiles = lib.fileset.difference (lib.fileset.fileFilter (file: file.hasExt "go") ./.) ./plugin;
      packageSrc = lib.fileset.toSource {
        root = ./.;
        fileset = lib.fileset.unions [
          ./go.mod
          ./go.sum
          ./README.md
          ./testhelpers
          ./testdata
          goFiles
        ];
      };

      # md-go-validator's own flake still builds with go 1.26 while its
      # go.mod requires >= 1.27, so we build it here with the go 1.27
      # module builder against the pinned input source. Shared between the
      # devShell and the validate-docs app — same arguments, same derivation.
      mkMdgo =
        pkgs:
        let
          mdgoVersion = md-go-validator.shortRev or "dev";
        in
        pkgs.buildGo127Module {
          pname = "md-go-validator";
          version = mdgoVersion;
          src = md-go-validator.outPath or md-go-validator;
          vendorHash = "sha256-fYZoTXM7uPiV174Mp6/HgUNKwNih/BzjnCMjHwdcAOE=";
          proxyVendor = true;
          GOEXPERIMENT = "jsonv2";
          doCheck = false;
          ldflags = [
            "-s"
            "-w"
            "-X main.version=${mdgoVersion}"
          ];
          meta = {
            description = "Validate code blocks embedded in Markdown and MDX documentation files";
            mainProgram = "md-go-validator";
          };
        };
    in
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [ inputs.go-nix-helpers.flakeModules.go-standard ];

      go-standard = {
        pname = "gogenfilter";
        description = "Go library for detecting and filtering auto-generated code files";
        goPkgAttr = "go_1_27";
        # Linux only: the proxy-vendored go-modules FOD hashes differently on
        # darwin (aarch64-darwin got sha256-cf2KvkrLsfTHaqdmzBZ4YB28uGwWiQVLPfgprlGP/1c=);
        # until go-standard grows per-platform vendor hashes, restrict systems.
        systems = [
          "x86_64-linux"
          "aarch64-linux"
        ];
        src = packageSrc;
        vendorHash = "sha256-cf2KvkrLsfTHaqdmzBZ4YB28uGwWiQVLPfgprlGP/1c=";
        # Match the hand-rolled build: vendoring via the module proxy.
        proxyVendor = true;
        enableTestCheck = true;
        enableGofumpt = true;
        enableGoimports = true;
        enableNixfmt = true;
        extraMeta = {
          homepage = "https://gogenfilter.lars.software";
          platforms = lib.platforms.unix ++ lib.platforms.windows;
        };
        devShellExtraPackages = pkgs: [
          pkgs.gofumpt
          pkgs.golines
          pkgs.gotools
          pkgs.trash-cli
          (mkMdgo pkgs)
        ];
        devShellHook = ''
          echo "gogenfilter dev shell — $(go version)"
        '';
      };

      perSystem =
        {
          config,
          pkgs,
          ...
        }:
        let
          goPkg = pkgs.go_1_27;
          mdgo = mkMdgo pkgs;

          mkApp =
            name: description: runtimeInputs: text:
            let
              script = pkgs.writeShellApplication {
                inherit name runtimeInputs text;
                meta.description = description;
              };
            in
            {
              type = "app";
              program = lib.getExe script;
              meta.description = description;
            };
        in
        {
          # golines on top of go-standard's enabled programs
          # (gofumpt/goimports/nixfmt).
          treefmt = {
            projectRootFile = "go.mod";
            programs.golines.enable = true;
          };

          # All bespoke apps survive verbatim; go-standard's generic
          # default/test/lint apps are mkDefault, so these win where names
          # collide.
          apps = {
            test = mkApp "test" "Run the Go test suite" [ goPkg ] ''
              go test ./... -count=1 "$@"
            '';

            test-race = mkApp "test-race" "Run tests with the race detector" [ goPkg ] ''
              go test ./... -race -count=1 "$@"
            '';

            build = mkApp "build" "Compile all Go packages" [ goPkg ] ''
              go build ./...
            '';

            vet = mkApp "vet" "Run go vet on all packages" [ goPkg ] ''
              go vet ./...
            '';

            lint = mkApp "lint" "Run golangci-lint" [ pkgs.golangci-lint ] ''
              golangci-lint run ./...
            '';

            gendocs = mkApp "gendocs" "Generate documentation from the detectors table" [ goPkg ] ''
              go run ./cmd/gendocs "$@"
            '';

            coverage = mkApp "coverage" "Generate test coverage report" [ goPkg ] ''
              go test ./... -coverprofile=coverage.out -covermode=atomic "$@"
              go tool cover -func=coverage.out
            '';

            vulncheck = mkApp "vulncheck" "Scan for Go vulnerabilities with govulncheck" [ pkgs.govulncheck ] ''
              govulncheck ./...
            '';

            clean =
              mkApp "clean" "Remove coverage artifacts and clear test cache"
                [
                  goPkg
                  pkgs.trash-cli
                ]
                ''
                  trash-put coverage.out 2>/dev/null || true
                  go clean -testcache
                '';

            validate-docs =
              mkApp "validate-docs" "Validate website docs structure with md-go-validator" [ mdgo ]
                ''
                  md-go-validator -f table website/src/content/docs/
                '';
          };
        };
    };
}
