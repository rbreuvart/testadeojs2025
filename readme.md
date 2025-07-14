# Test technique pour adeo

Voici une implemenation complete et trop complexe pour l'ennoncé ici proposé
Néanmoins, dans le cadre de ce test, j'ai choisie de valoriser mes compétences techniques.


# Architechture


```
/app  -> enssemble des class et entités
├───application
│   └───usecases
├───domain
│   ├───entities
│   │   └───values-objects
│   ├───errors
│   └───services
├───infrastructure
│   ├───cli
│   ├───data
│   ├───logger
│   ├───mappers
│   └───services
└───presentation
/test  -> enssemble des tests unitaires
├───application
│   └───usecases
├───domain
│   ├───entities
│   │   └───values-objects
│   ├───errors
│   └───services
├───infrastructure
│   ├───cli
│   ├───data
│   ├───logger
│   ├───mappers
│   └───services
└───presentation
/jest.config.ts -> configuartion des tests unitaires
/tsconfig.json -> declaration de la configuration de Typescript
/package.json --> declaration des dependances...
```

![diag](https://github.com/rbreuvart/testadeojs2025/docs/raw/master/docs/diag.png "diagramme")

# Instalation
```
git clone https://github.com/rbreuvart/testadeojs2025.git
cd testadeojs2025
npm i
npm build
```

# Usage
```
node dist/src/app.js  --filter=ry 
node dist/src/app.js  --filter=or 
node dist/src/app.js  --count
...
```
# Validation des tests unitaires
npm run test       