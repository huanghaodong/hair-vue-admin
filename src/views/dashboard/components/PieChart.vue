<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils/util'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '110px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions({ data, legend, roseType, radius } = {}) {
      const _this = this
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b} {d}%'
        },
        legend: {
          orient: 'vertical',
          right: 0,
          top: 10,
          icon: 'circle',
          itemWidth: 6, // 图例图形宽度
          itemHeight: 6,
          data: legend,
          formatter: function(name) {
            const data = _this.chart.getOption().series[0].data
            let value = ''
            data.map((item) => {
              if (item.name === name) {
                value = item.value
              }
            })
            return name + '  ' + value
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: radius,
            center: ['20%', '40%'],
            roseType: roseType,
            legendHoverLink: false,
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: 'center',
                formatter: '{d}'
              }
            },
            data: data
          }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
