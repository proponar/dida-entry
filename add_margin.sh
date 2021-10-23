for f in public/help/*html; do
  echo fixing margin in $f
  sed -i -e "s/<body class=\"stackedit\">/<body class=\"stackedit\" style=\"margin-bottom: -120px; margin-top: -40px;\">/" $f
done
