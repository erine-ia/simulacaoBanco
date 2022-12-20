const chalk = require('chalk')
const inquirer = require('inquirer')
const fs = require('fs')

console.log('Iniciando...')

operation()
function operation(){
    inquirer.prompt([{
        type: 'list', 
        name: 'action',
        message: 'O que voce deseja fazer?',
        choices: [
            'Criar Conta',
            'Consultar Saldo', 
            'Depositar', 
            'Sacar', 
            'Sair'

        ],
    }]).then((answer) =>{
        const action = answer['action']
        //console.log(action)
        
        if(action == 'Criar Conta'){
            createAccount()
        }
    }).catch(err => console.log(err))
}

//criando conta
function createAccount(){
      console.log(chalk.bgGreen.black("Obrigado por escolher nosso banco!") )   
      console.log(chalk.green('Defina as opções da sua conta a seguir:'))                      
}