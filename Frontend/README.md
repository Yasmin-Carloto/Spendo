# Spendo - Frontend
Interface da aplicação Spendo, voltada para o gerenciamento de finanças.

## Sumário 
1. [Tecnologias utilizadas](#tecnologias-utilizadas)
2. [Protótipos](#protótipos)
3. [Configuração do arquivo .env](#tecnologias-utilizadas)
4. [Arquitetura](#arquitetura)

## Protótipos
Esse protótipos foram feitos no figma.
![Protótipo para mobile](https://github.com/Yasmin-Carloto/Spendo/blob/main/Frontend/public/assets/Mobile.png)

![Protótipo para PC](https://github.com/Yasmin-Carloto/Spendo/blob/main/Frontend/public/assets/PC.png)

## Tecnologias utilizadas
- **shadcn**:
    Para a reutilização de componentes.
- **tailwind**:
    Biblioteca para a estilização.
- **zutand**:
    Para gerenciamento de estado.
- **sooner**:
    Para a confirmação de ações.
- **eslint**:
    Para código limpo usando js.
- **react**:
    Biblioteca para componentização.
- **vite**:
    
## Configuração do arquivo .env
```
VITE_SPENDO_API_URL_BASE= # URL do endpoint do Backend
```

## Arquitetura 
```
src
   |
    - components (shadcn)
    - contexts
    - hook
    - lib
    - ui
       |
        - assets
        - components
        - modules
        - stores
        - templates
        - utils
```
