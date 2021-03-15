const nav = require('./config/nav/')
const sidebar = require('./config/sider/')
module.exports = {
    title: 'My Docs',
    description: 'VitePress 体验版',
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        // GitHub
        // repo: 'wyw_miss/vpb',
        // docsDir: 'docs',
        // editLinks: true,
        // editLinkText: 'Edit this page on GitHub',
        lastUpdated: '更新时间',
        // 搜索
        // algolia: {
        //     apiKey: 'c57105e511faa5558547599f120ceeba',
        //     indexName: 'vitepress'
        // },
        //广告
        // carbonAds: {
        //     carbon: 'CEBDT27Y',
        //     custom: 'CKYD62QM',
        //     placement: 'vuejsorg'
        // },
        nav,
        sidebar
    }
}