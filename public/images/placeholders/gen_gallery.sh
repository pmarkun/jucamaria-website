#!/bin/bash
# Generate gallery placeholder SVGs
OUTDIR="/home/markun/devel/jucamaria/jucamaria-website/public/images/placeholders"

make_svg() {
  local file="$1"
  local bg="$2"
  local label="$3"
  local sublabel="$4"
  local num="$5"
  cat > "$file" << SVGEOF
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
  <rect width="600" height="450" fill="$bg"/>
  <rect x="0" y="350" width="600" height="100" fill="#2B2B2B" opacity="0.5"/>
  <text x="300" y="395" font-family="Georgia, serif" font-size="16" fill="#F2EFE8" text-anchor="middle" opacity="0.85">$label</text>
  <text x="300" y="418" font-family="Arial, sans-serif" font-size="11" fill="#E7B53E" text-anchor="middle" opacity="0.65">$sublabel</text>
  <text x="300" y="438" font-family="Arial, sans-serif" font-size="9" fill="#F2EFE8" text-anchor="middle" opacity="0.3">[ galeria $num — foto real a definir ]</text>
</svg>
SVGEOF
}

make_svg "$OUTDIR/laboratorio-passarinho-2.svg" "#263547" "Laboratório Passarinho" "Instrumentos criados" "2/4"
make_svg "$OUTDIR/laboratorio-passarinho-3.svg" "#2F4E6F" "Laboratório Passarinho" "Detalhe do processo" "3/4"
make_svg "$OUTDIR/laboratorio-passarinho-4.svg" "#1A3550" "Laboratório Passarinho" "Mostra aberta ao bairro" "4/4"
make_svg "$OUTDIR/cartografias-do-possivel-2.svg" "#2A1F15" "Cartografias do Possível" "Sessão de troca" "2/4"
make_svg "$OUTDIR/cartografias-do-possivel-3.svg" "#3D2B1F" "Cartografias do Possível" "Diários de campo" "3/4"
make_svg "$OUTDIR/cartografias-do-possivel-4.svg" "#4A3525" "Cartografias do Possível" "Abertura da exposição" "4/4"
make_svg "$OUTDIR/tecendo-redes-2.svg" "#1A3A2A" "Tecendo Redes" "Litoral do Ceará" "2/3"
make_svg "$OUTDIR/tecendo-redes-3.svg" "#1F4A35" "Tecendo Redes" "Produção do documentário" "3/3"

echo "Done"
