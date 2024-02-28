module.exports = {
    apps: [
        {
            name: "genie_parser",
            script: "./index.js",
            watch: true,
            env: {
                "NODE_ENV": "production",
                "GENIEACS_NBI_HOST": "http://localhost:7557",
                "GENIEPARSER_NBI_PORT": 7577
            }
        }
    ]
}