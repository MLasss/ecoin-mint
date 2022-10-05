# NFT Dapp

## Installation

1. To install the dependencies, run the below command:
    ```
    yarn
    ```
2. To Setup environment variables and network, you can refer to the environment variables (.env) file. All the chain IDs that support Moralis can be found via this URL : https://v1docs.moralis.io/moralis-dapp/web3-api/supported-chains
## Usage

To run the project, execute the below command:
    ```
    yarn start
    ```

## Few notes

- You will see some dependency warnings in the terminal. They're related to Moralis Library and still there are no fix available
(Reference: https://forum.moralis.io/t/module-not-found-error-cant-resolve-magic-sdk/14218)

- For some reason, the Moralis credentials that you have provided didn't work. So, I created my own test server on Polygon and used it. 