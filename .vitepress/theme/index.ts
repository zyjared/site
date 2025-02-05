import DefaultTheme from 'vitepress/theme'
import LinkBar from '../../src/components/LinkBar/index.vue'
import './styles/variables.css'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LinkBar', LinkBar)
  },
}
