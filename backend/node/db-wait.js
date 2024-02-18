const exec = require('child_process').exec;
const attemptMigration = () => {
  exec('npx prisma migrate dev --name init', (error, stdout, stderr) => {
    if (error) {
      console.error('Migration failed, retrying in 5 seconds', stderr);
      setTimeout(attemptMigration, 5000); // Retry after 5 seconds
    } else {
      console.log('Migration succeeded', stdout);
      process.exit(0); // Exit script successfully
    }
  });
};
attemptMigration();
