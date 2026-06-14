{
  description = "gogenfilter website — Astro + Starlight";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    md-go-validator = {
      url = "github:LarsArtmann/md-go-validator";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    { self, nixpkgs, md-go-validator }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      apps = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          mdgo = md-go-validator.packages.${system}.default.overrideAttrs (_: {
            vendorHash = "sha256-r2hvS99DCP2DkLrMkRs4lOkvDk2tQI+CGQl89KM4ZBc=";
          });
        in
        {
          dev = {
            type = "app";
            program = "${
              pkgs.writeShellApplication {
                name = "dev";
                runtimeInputs = with pkgs; [ nodejs ];
                text = ''
                  npm run dev
                '';
              }
            }/bin/dev";
          };

          build = {
            type = "app";
            program = "${
              pkgs.writeShellApplication {
                name = "build";
                runtimeInputs = with pkgs; [ nodejs ];
                text = ''
                  npm run build
                '';
              }
            }/bin/build";
          };

          preview = {
            type = "app";
            program = "${
              pkgs.writeShellApplication {
                name = "preview";
                runtimeInputs = with pkgs; [ nodejs ];
                text = ''
                  npm run preview
                '';
              }
            }/bin/preview";
          };

          deploy = {
            type = "app";
            program = "${
              pkgs.writeShellApplication {
                name = "deploy";
                runtimeInputs = with pkgs; [
                  nodejs
                  firebase-tools
                ];
                text = ''
                  npm run build
                  firebase deploy --only hosting
                '';
              }
            }/bin/deploy";
          };

          validate-docs = {
            type = "app";
            program = "${
              pkgs.writeShellApplication {
                name = "validate-docs";
                runtimeInputs = [
                  pkgs.nodejs
                  mdgo
                ];
                text = ''
                  md-go-validator -f table src/content/docs/
                '';
              }
            }/bin/validate-docs";
          };
        }
      );

      devShells = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          mdgo = md-go-validator.packages.${system}.default.overrideAttrs (_: {
            vendorHash = "sha256-r2hvS99DCP2DkLrMkRs4lOkvDk2tQI+CGQl89KM4ZBc=";
          });
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              nodejs
              firebase-tools
            ] ++ [ mdgo ];
          };
        }
      );

      checks = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          format = pkgs.runCommand "format-check" { nativeBuildInputs = [ pkgs.nixfmt ]; } ''
            nixfmt --check ${./flake.nix} && touch $out
          '';
        }
      );

      formatter = forAllSystems (system: nixpkgs.legacyPackages.${system}.nixfmt);
    };
}
