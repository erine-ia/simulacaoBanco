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
            getAccountBalance()

        }else if(action == 'Depositar'){
            deposit()

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


//função depositar
function deposit(){
    inquirer.prompt([{
        name:'accountName',
        message: 'Qual é o nome da sua Conta?'
    }]).then((answer) =>{
        const accountName = answer['accountName']

        //verificando se a conta existe
        if(!checkAccount(accountName)){
            return deposit()
        }

        inquirer.prompt([{
            name: 'amount',
            message: 'Quanto você deseja deposita?'
        }]).then((answer) =>{
            const amount = answer['amount']

            //adicionr o deposito
            addAmount(accountName, amount);


            operation()

        }).catch((err)=>{
            console.log(err)
        })


    })
    .catch((err) => console.log(err))
}

function checkAccount(){
    if(fs.existsSync(`accounts/${accountName}.json`)){
        console.log('Esta conta não existe! Crie uma conta ou escolha outro nome!')
        return false
    }

    return true
}


//função para adicionar deposito
function addAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.log('Ocorreu um erro. Tente novamente mais tarde')

        return deposit()
    }
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        }
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta`))
 

}

//função para ler valores já contidos na conta 
function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parser(accountJSON)
}


//função para consultar saldo
function getAccountBalance(){
    inquirer.prompt([{
        name:'accountName', 
        message: 'Qual o nome da sua conta?'
    }]).then((answer)=>{
        const accountName = answer['accountName']
        //verificando se a conta existe
        if(!checkAccount(accountName)){
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)

        console.log('Olá, o saldo da sua conta é R$', accountData.balance )
        
        operation()
    }).catch((err)=>console.log(err))
    
}