{
  description = "Dev shell for Juca Maria website (Next.js + Strapi)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22
            python3
            pkg-config
            gnumake
            gcc
          ];

          shellHook = ''
            export npm_config_nodedir=${pkgs.nodejs_22}
            echo "Dev shell ativo: Node $(node --version), npm $(npm --version)"
          '';
        };
      });
}
