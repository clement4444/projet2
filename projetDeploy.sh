# supprime les ficher qui pose problème pour le deploiement
rm package.json
rm package-lock.json

# import de node
export PATH="$PATH:/opt/alt/alt-nodejs20/root/usr/bin/"

# installation des dépendances
cd ./client && npm install
cd ..

# build
cd ./client && npm run build
cd ..
cp ./client/.htaccess ./client/dist/

# deploiement
mkdir -p /home/ficl4036/public_html/projet2

cp -R ./client/dist/. /home/ficl4036/public_html/projet2/
