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
                icon: '',
                name: 'School',
                description: 'Nankai University'
            },
            {
                icon: '',
                name: 'Major',
                description: 'Software Engineer'
            },
            {
                icon: '',
                name: 'Interests',
                description: 'Deep Learning, Machine Learning, Netword etc...'
            },
            {
                icon: '',
                name: 'Email',
                description: 'zedongjia305@gmail.com'
            }
        ]
        const details = [
            {
                topic: 'Research',
                items: [
                    { href: 'https://github.com/ZedongJia/TrinityRCL', title: 'Reproduce TrinityRCL (Multi-Granular and Code-Level Root Cause Localization Using Multiple Types of Telemetry Data in Microservice Systems)' },
                ]
            },
            {
                topic: 'Project',
                items: [
                    {
                        href: 'https://github.com/ZedongJia/College-Helper',
                        title: '教育垂直领域，志愿填报知识图谱项目'
                    },
                    {
                        href: 'https://github.com/ZedongJia/Subjects-of-the-Sun',
                        title: '基于vue的三星堆文化博物馆项目'
                    },
                    { href: 'https://github.com/ZedongJia/c-compiler', title: 'C语言代码编译器项目' }
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
