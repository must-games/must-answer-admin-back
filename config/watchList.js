const server_list = [
    {
        category: 'Redis',
        displayName: 'dev-Redis',
        address: 'localhost',
        port: 6379,
    },
    {
        category: 'DataBase',
        displayName: 'dev-mysql8',
        address: 'localhost',
        port: 3306,
    },
    {
        category: 'Web-Proxy',
        displayName: 'dev-nginx',
        address: 'localhost',
        port: 80,
    },
    {
        category: 'Game',
        displayName: 'dev-Game',
        address: 'localhost',
        port: 8080,
    },
    {
        category: 'Auth',
        displayName: 'dev-Auth',
        address: 'localhost',
        port: 9090,
    },
]

const test_server_list = [
    {
        category: 'Redis',
        displayName: 'dev-Redis',
        address: 'localhost',
        port: 6379,
    },
    {
        category: 'DataBase',
        displayName: 'test-mysql8',
        address: 'dev-db.ceijnqf7uf1x.ap-northeast-2.rds.amazonaws.com',
        port: 3306,
    },
    {
        category: 'Web-Proxy',
        displayName: 'test-nginx',
        address: 'localhost',
        port: 8888,
    },
    {
        category: 'Game',
        displayName: 'test-Game',
        address: 'localhost',
        port: 8080,
    },
    {
        category: 'Auth',
        displayName: 'test-Auth',
        address: 'localhost',
        port: 9090,
    },
]

const dev_server_list = [
    {
        category: 'Redis',
        displayName: 'dev-Redis',
        address: 'localhost',
        port: 6379,
    },
    {
        category: 'DataBase',
        displayName: 'dev-mysql8',
        address: 'localhost',
        port: 3306,
    },
    {
        category: 'Web-Proxy',
        displayName: 'dev-nginx',
        address: 'localhost',
        port: 80,
    },
    {
        category: 'Game',
        displayName: 'dev-Game',
        address: 'localhost',
        port: 8080,
    },
    {
        category: 'Auth',
        displayName: 'dev-Auth',
        address: 'localhost',
        port: 9090,
    },
]

module.exports = {
    server_list,
    test_server_list,
    dev_server_list,
}
