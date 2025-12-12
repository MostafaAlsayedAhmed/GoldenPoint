const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', '.tmp', 'data.db');
const db = new Database(dbPath);

try {
  // Query for documentation plugin settings
  console.log('Searching for documentation plugin settings...\n');
  
  const settings = db.prepare(`
    SELECT * FROM strapi_core_store_settings 
    WHERE key LIKE '%documentation%'
  `).all();
  
  console.log(`Found ${settings.length} documentation-related settings:\n`);
  
  settings.forEach((setting, index) => {
    console.log(`[${index + 1}] Key: ${setting.key}`);
    console.log(`    Value: ${setting.value}`);
    console.log(`    Type: ${setting.type}`);
    console.log('');
  });
  
  // Delete the plugin_documentation settings
  const deleteResult = db.prepare(`
    DELETE FROM strapi_core_store_settings 
    WHERE key = 'plugin_documentation'
  `).run();
  
  console.log(`Deleted ${deleteResult.changes} documentation plugin setting(s)`);
  console.log('\nRestart your Strapi server for changes to take effect.');
  
} catch (error) {
  console.error('Error:', error.message);
} finally {
  db.close();
}
