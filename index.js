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

        }else if(action == 'Consultar Saldo'){

        }else if(action == 'Depositar'){

        }else if(action == 'Sacar'){
            
        }else if(action == 'Sair'){
            console.log(chalk.bgBlue.black('Obrigada por usar o Accounts!'))
            process.exit()
        }


    }).catch(err => console.log(err))
}

//criando conta
function createAccount(){
      console.log(chalk.bgGreen.black("Obrigado por escolher nosso banco!") )   
      console.log(chalk.green('Defina as opções da sua conta a seguir'))  
      
      buildAccount()
}


function buildAccount(){
    inquirer.prompt([{
        name: 'accountName',
        message: "Digite um nome para a sua conta:"
    }]).then((answer) => {
        //console.log(answer)
        const accountName = answer['accountName']
        console.info(answer)

        if(fs.existsSync('accounts')){
            fs.mkdirSync('accounts')

        }

        if(fs.existSyncs(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black("Esta conta já existe! Escolha outro nome."))
            buildAccount()
            return
        }
        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance":0}', function(err){
            console.log(err)
        })

        console.log(chalk.green('Parabéns a sua conta foi criada!'))
        operation()


    }).catch((err) => console.log(err))
}