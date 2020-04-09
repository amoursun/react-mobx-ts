/* eslint-disable */
const fs = require('fs');
const path = require('path');

const proxy = {
    'GET /__api/public/getArea': function(req, res) {
        console.log('GET mock: /__api/public/getArea');
        const area = require('./files/area.json');
        res.json(area);
    },
    'GET /__api/public/getDict/English_type': function (req, res) {
        console.log('GET /__api/public/getDict/English_type');
        res.json({
            code: '0',
            message: 'success',
            httpCode: '200',
            err: null,
            data: [
                {
                    dictvalue: '1',
                    dicttext: '通用版',
                },
                {
                    dictvalue: '2',
                    dicttext: '人教版',
                },
                {
                    dictvalue: '3',
                    dicttext: '浙教版',
                },
                {
                    dictvalue: '4',
                    dicttext: '苏科版',
                },
                {
                    dictvalue: '5',
                    dicttext: '北师大版',
                },
            ],
            successful: true,
        });
    }
}

module.exports = proxy;
