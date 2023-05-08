# LAA
poc

Setup step - 
Run - **npm install**
Run - **npm install -g sequelize-cli**
Run - **sequelize-cli db:migrate**
Run - **sequelize-cli db:seed:all**
Run - **npm start**

In case of rollback run - **sequelize-cli db:migrate:undo**   --this command will revert the most recent migration.
To revert all - **sequelize-cli db:migrate:undo:all**


