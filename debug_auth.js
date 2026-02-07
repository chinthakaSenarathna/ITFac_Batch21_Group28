const fs = require('fs');

try {
    const data = fs.readFileSync('api-docs.json', 'utf8');
    const spec = JSON.parse(data);

    console.log("Searching for POST paths...");
    const keys = Object.keys(spec.paths);

    keys.forEach(key => {
        const methods = Object.keys(spec.paths[key]);
        if (methods.includes('post')) {
            console.log(`POST Endpoint: ${key}`);
        }
    });

    // Original filter loop for reference or removal
    const oldKeys = [];
    oldKeys.forEach(key => {
        const methods = Object.keys(spec.paths[key]);
        methods.forEach(method => {
            console.log(`  Method: ${method}`);
            const op = spec.paths[key][method];
            if (op.requestBody) {
                console.log(`    Content-Types: ${Object.keys(op.requestBody.content)}`);
                const jsonSchema = op.requestBody.content['application/json'].schema;
                if (jsonSchema.$ref) {
                    console.log(`    Schema Ref: ${jsonSchema.$ref}`);
                    // Resolve ref
                    const refName = jsonSchema.$ref.split('/').pop();
                    console.log(`    Schema Definition (${refName}):`, JSON.stringify(spec.components.schemas[refName], null, 2));
                }
            }
        });
    });

} catch (e) {
    console.error(e);
}
