import { ref } from '../../../plugins/vue3.4.33.js'
import Wrapper from '../../components/wrapper.js'
import Addition from '../../components/addition.js'
import Detail from './components/detail.js'
const template = `
<Wrapper>
    <div id="introduction">
        <div id="left">
            <Detail
                v-for="detail in details"
                :topic="detail.topic"
                :items="detail.items"
            >
            </Detail>
        </div>
        <div id="right">
            <img id="avator" src="/images/avator.jpg">
            <Addition
            v-for="addition in additions"
            :icon="addition.icon"
            :name="addition.name"
            :description="addition.description"
            >
            </Addition>
        </div>
    </div>
</Wrapper>
`

export default {
    setup() {
        const additions = [
            {
                icon: 'school-outline',
                name: 'Education',
                description: 'Undergraduate, Software Engineer, Nankai University'
            },
            {
                icon: 'heart-circle-outline',
                name: 'Interests',
                description: 'Deep Learning, Machine Learning, Netword etc...'
            },
            {
                icon: 'mail-outline',
                name: 'Email',
                description: 'zedongjia305@gmail.com'
            }
        ]
        const details = [
            {
                topic: 'Research',
                items: [
                    {
                        href: 'https://github.com/ZedongJia/TrinityRCL',
                        title: 'Reproduce TrinityRCL',
                        desc: 'An unofficial implement of Multi-Granular and Code-Level Root Cause Localization Using Multiple Types of Telemetry Data in Microservice Systems'
                    }
                ]
            },
            {
                topic: 'Project',
                items: [
                    {
                        href: 'https://github.com/ZedongJia/College-Helper',
                        title: '教育垂直领域，志愿填报知识图谱项目',
                        desc: '高考志愿填报对考生未来职业发展至关重要，是生涯规划的关键环节。然而，当前社会信息繁杂且不对称，考生难以全面获取大学、专业及就业相关信息，受到信息壁垒影响，尤其是专业术语丰富的招生政策增加了选择难度。网络信息的分散与真实性问题使考生难以有效对比心仪大学的各项条件，难以充分利用高考分数。针对此，该项目旨在服务高考志愿填报，通过构建系统平台，为考生提供全面便捷的大学招生信息及校园环境资源，解决报考过程中的实际困难。'
                    },
                    {
                        href: 'https://github.com/ZedongJia/Subjects-of-the-Sun',
                        title: '基于vue的三星堆文化博物馆项目',
                        desc: '利用vue框架实现的纯前端三星堆博物馆项目'
                    },
                    {
                        href: 'https://github.com/ZedongJia/c-compiler',
                        title: 'C语言代码编译器项目',
                        desc: '一个基于C语言实现的简单C语言编译器，可以支持一些常见C语言的语法'
                    }
                ]
            }
        ]
        return {
            additions,
            details
        }
    },
    template: template,
    components: {
        Wrapper,
        Addition,
        Detail
    }
}
