> docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Temp2121x' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2017-latest
> /Users/serdarturkmen/Desktop/impektra/muhasebe/docker-compose.yml


> docker create -v /var/opt/mssql --name mssql microsoft/mssql-server-linux /bin/true

> docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Temp2121x' -p 1433:1433 --volumes-from mssql -d --name sql-server microsoft/mssql-server-linux

> 
CREATE TABLE employee (
    id Int,
    firstname varchar(255),
    lastname varchar(255),
    age Int
);

> INSERT INTO employee (id, firstname, lastname, age) VALUES (1, 'Serdar', 'Turkmen', 33);

> select * from employees;

> drop table employee;


> shell:startup
> %AppData%\Microsoft\Windows\Start Menu\Programs\Startup\
> .vbs kısayol olustur
