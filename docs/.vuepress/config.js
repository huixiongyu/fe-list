module.exports = {
    markdown: {
        lineNumbers: true
    },
    base: '/fe-list/',
    title: '前端知识清单',
    description: '关于前端的一切',
    head: [
        ['link', { rel: 'icon', href: '/flower.ico' }],
    ],
    themeConfig: {
        nav: [
            {
                text: '首页',
                link: '/'
            },
            { 
                text: '核心知识',
                link: '/core/',
                items: [
                    { text: 'JavaScript', link: '/core/JavaScript/basic' },
                    { text: 'CSS', link: '/core/CSS/hi' },
                    { text: '计算机网络', link: '/core/network/haha' }
                ]
            },
            {
                text: '数据结构',
                items: [
                    { text: '基础知识', link: '/datastructure/basic/00-index' },
                    { text: 'PAT', link: '/datastructure/PAT/00-index' },
                    { text: 'leetcode', link: '/datastructure/leetcode/00-index' }
                ]
            },
            {
                text: '三日一题',
                link: '/threedays/'
            },
            {
                text: 'Node.js',
                link: '/Node/basic'
            },
            {
                text: 'Vue开发',
                link: '/Vue/00-basic'
            },
            {
                text: 'React开发',
                link: '/React/'
            },
            { 
                text: '小程序开发', 
                link: '/weapp/'
            },
            { 
                text: 'Github', 
                link: 'https://github.com/huixiongyu/Frontend-Development-Knowledge-and-Practice'
            }
        ],
        sidebar: {
            '/': [
                ''
            ],
            '/threedays/': [
                ''
            ],
            '/core/': [
                '',
                {
                    title:'JavaScript',
                    collapsable: true,
                    children:[
                      '/core/JavaScript/basic'
                    ]
                },
                {
                    title: 'CSS',
                    collapsable: true,
                    children:[
                      '/core/CSS/hi'
                    ]
                },
                {
                    title: '计算机网络',
                    collapsable: true,
                    children:[
                      '/core/network/haha'
                    ]
                }
            ],
            '/Node/': [
                'basic'
            ],
            '/datastructure/': [
                '',
                {
                    title: '基础',
                    collapsable: true,
                    children:[
                      '/datastructure/basic/00-index'
                    ]
                },
                {
                    title:'PAT',
                    collapsable: true,
                    children:[
                      '/datastructure/PAT/00-index'
                    ]
                },
                {
                    title: 'leetcode',
                    collapsable: true,
                    children:[
                      '/datastructure/leetcode/00-index'
                    ]
                }
            ],
            '/Vue/': [
                '00-basic',
                '01-vue',
                '02-wechat',
                '10-develop-rules'
            ],
            '/React/': [
                ''
            ],
            '/weapp/': [
                ''
            ]
        },
        sidebarDepth: 1,
        lastUpdated: '更新时间', 
        docsDir: 'docs',
        editLinks: true,
        editLinkText: '帮助我完善这篇内容🙏'
    }    
}