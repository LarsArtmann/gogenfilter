{
  description = "gogenfilter website — Astro + Starlight";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      apps = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          dev = {
            type = "app";
            program = "${pkgs.writeShellApplication {
              name = "dev";
              runtimeInputs = with pkgs; [ nodejs ];
              text = ''
                npm run dev
              '';
            }}/bin/dev";
          };

          build = {
            type = "app";
            program = "${pkgs.writeShellApplication {
              name = "build";
              runtimeInputs = with pkgs; [ nodejs ];
              text = ''
                npm run build
              '';
            }}/bin/build";
          };

          preview = {
            type = "app";
            program = "${pkgs.writeShellApplication {
              name = "preview";
              runtimeInputs = with pkgs; [ nodejs ];
              text = ''
                npm run preview
              '';
            }}/bin/preview";
          };

          deploy = {
            type = "app";
            program = "${pkgs.writeShellApplication {
              name = "deploy";
              runtimeInputs = with pkgs; [ nodejs firebase-tools ];
              text = ''
                npm run build
                firebase deploy --only hosting
              '';
            }}/bin/deploy";
          };

          validate-docs = {
            type = "app";
            program = "${pkgs.writeShellApplication {
              name = "validate-docs";
              runtimeInputs = with pkgs; [ nodejs ];
              text = ''
                npm run validate:docs
              '';
            }}/bin/validate-docs";
          };
        });

      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              nodejs
              firebase-tools
            ];
          };
        });
    };
}
