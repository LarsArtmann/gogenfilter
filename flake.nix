{
  description = "gogenfilter — Go source filtering framework";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    systems.url = "github:nix-systems/default";
  };

  outputs =
    inputs@{
      self,
      nixpkgs,
      flake-parts,
      treefmt-nix,
      systems,
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
          goPkg = pkgs.go_1_26;

          mkApp = name: script: {
            type = "app";
            program = "${pkgs.writeShellScriptBin name script}/bin/${name}";
          };
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

          devShells.default = pkgs.mkShell {
            packages = [
              goPkg
              pkgs.golangci-lint
              pkgs.gofumpt
              pkgs.golines
              pkgs.gotools
              pkgs.govulncheck
              pkgs.trash-cli
            ];

            shellHook = ''
              echo "gogenfilter dev shell — $(go version)"
            '';
          };

          checks = {
            build = pkgs.runCommand "gogenfilter-build" { nativeBuildInputs = [ goPkg ]; } ''
              export GOWORK=off
              cp -r ${./.} src && chmod -R u+w src && cd src
              ${goPkg}/bin/go build ./...
              touch $out
            '';
          };

          apps = {
            test = mkApp "test" ''
              set -euo pipefail
              ${goPkg}/bin/go test ./... -count=1 "$@"
            '';

            test-race = mkApp "test-race" ''
              set -euo pipefail
              ${goPkg}/bin/go test ./... -race -count=1 "$@"
            '';

            build = mkApp "build" ''
              set -euo pipefail
              ${goPkg}/bin/go build ./...
            '';

            vet = mkApp "vet" ''
              set -euo pipefail
              ${goPkg}/bin/go vet ./...
            '';

            lint = mkApp "lint" ''
              set -euo pipefail
              ${pkgs.golangci-lint}/bin/golangci-lint run ./...
            '';

            coverage = mkApp "coverage" ''
              set -euo pipefail
              ${goPkg}/bin/go test ./... -coverprofile=coverage.out -covermode=atomic "$@"
              ${goPkg}/bin/go tool cover -func=coverage.out
            '';

            vulncheck = mkApp "vulncheck" ''
              set -euo pipefail
              ${pkgs.govulncheck}/bin/govulncheck ./...
            '';

            clean = mkApp "clean" ''
              set -euo pipefail
              ${pkgs.trash-cli}/bin/trash-put coverage.out 2>/dev/null || true
              ${goPkg}/bin/go clean -testcache
            '';
          };
        };
    };
}
