# Projeto LoopBack Indt

Pré-requisitos
Para o Windows 7
Instale:
1.	Python (v2.7.3 recomendado, v3.xx não suportado) para o pacote node-gyp.
2.	Microsoft Visual Studio C++ 2013 (ou posterior) para o Windows Desktop.
3.	Git ferramenta para o gerenciamento de pacotes, npm usa-o para o download de pacotes a partir do GitHub.
4.  É necessário ter o nodejs instalado e o npm.
5.  Servidor MySQL

 
## Instalação


1. Clone o repositório: `git clone https://bauzierc@bitbucket.org/bauzierc/projectloopback.git`
2.	Acesse pasta raiz do projeto cd projectloopback
3.	Instale os pacotes:
		 `npm install`
		 `bower install`
4.	Acesse o banco de dados MySQL
5.	No MySQL importe o arquivo backupSQL.sql 
6.	Levante o servidor mysql. 
7.	Anote o host e a porta do servidor. 
8.	No terminal digite slc arc
9.	Entre no campo composer
10.	Edite o Data Source projetoloopback: 
		Edite o usuário mysql e senha.
		Edite Host e a porta do servidor mysql
		Teste a conexão com o banco 
11.	No terminal digite : node .
12.	Acesse o browser: `http://localhost:3000`




Developer: Bruno Auzier