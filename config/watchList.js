const server_list = [
    {
        category: 'Redis',
        displayName: 'e01-prd-Redis',
        address: '10.220.204.189',
        port: 6379,
    },
    {
        category: 'Web-Proxy',
        displayName: 'w01-prd-Nginx',
        address: '211.252.122.122',
        port: 443,
    },
    {
        category: 'Web-Proxy',
        displayName: 'w02-prd-Nginx',
        address: '211.252.122.107',
        port: 443,
    },
    {
        category: 'Game',
        displayName: 'e03-prd-Game',
        address: '10.220.204.248',
        port: 8080,
    },
    {
        category: 'Game',
        displayName: 'e04-prd-Game',
        address: '10.220.204.231',
        port: 8080,
    },
    {
        category: 'DataBase',
        displayName: 'd02-prd-GameDB',
        address: '10.220.205.70',
        port: 3306,
    },
    {
        category: 'Auth',
        displayName: 'a01-prd-Auth',
        address: '10.220.205.28',
        port: 8080,
    },
    {
        category: 'Auth',
        displayName: 'a02-prd-Auth',
        address: '10.220.205.30',
        port: 8080,
    },
    {
        category: 'DataBase',
        displayName: 'd03-prd-AuthDB',
        address: '10.220.205.92',
        port: 3306,
    },
]

const test_server_list = [
    {
        category: 'Redis',
        displayName: 'test-Redis',
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
        displayName: 'dev-nginx443',
        address: 'localhost',
        port: 443,
    },
    {
        category: 'Web-Proxy',
        displayName: 'dev-nginx80',
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
