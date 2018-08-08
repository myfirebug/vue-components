/*
* @Author: hejianping
* @Date:   2018-05-29 13:51:13
* @Last Modified by:   UEDHE
* @Last Modified time: 2018-07-17 15:02:39
*/
import Home from '../page/home.vue'
import Navigation from '../page/navigation.vue'
import List from '../page/list.vue'
import Button from '../page/button.vue'
import Badge from '../page/badge.vue'
import BottomMenuBar from '../page/bottomMenuBar.vue'
import Radio from '../page/radio.vue'
import Checkbox from '../page/checkbox.vue'
import Switch from '../page/switch.vue'
import Toast from '../page/toast.vue'
import Tips from '../page/tips.vue'
import SearchBar from '../page/searchBar.vue'
import Tabs from '../page/tabs.vue'
import PopUp from '../page/popUp.vue'
import ActionSheet from '../page/actionSheet.vue'
import Swiper from '../page/swiper.vue'
import DatePicker from '../page/datePicker.vue'
import Range from '../page/range.vue'
import PriceRange from '../page/priceRange.vue'
import Store from '../page/store.vue'
import Dialog from '../page/dialog.vue'
import Calendar from '../page/calendar.vue'
import CityPicker from '../page/cityPicker.vue'
import ScrollLoad from '../page/scrollLoad.vue'
import TextareaLimit from '../page/textareaLimit.vue'
import Uploader from '../page/uploader.vue'
import Score from '../page/score.vue'
import Test from '../page/test/test.vue'
import CheckPhoto from '../page/checkPhoto.vue'
import PullRefresh from '../page/pullRefresh.vue'

const componentsRoutes = [
  {
    path: '/test',
    name: 'test',
    component: Test,
    meta: {
      title: 'test'
    }
  },
  {
    path: '/',
    redirect: '/home',
    meta: {
      title: 'home'
    }
  },
  {
    path: '/navigation',
    name: 'navigation',
    component: Navigation,
    meta: {
      title: 'navigation'
    }
  },
  {
    path: '/list',
    name: 'list',
    component: List,
    meta: {
      title: 'list'
    }
  },
  {
    path: '/button',
    name: 'button',
    component: Button,
    meta: {
      title: 'button'
    }
  },
  {
    path: '/badge',
    name: 'badge',
    component: Badge,
    meta: {
      title: 'badge'
    }
  },
  {
    path: '/radio',
    name: 'radio',
    component: Radio,
    meta: {
      title: 'radio'
    }
  },
  {
    path: '/checkbox',
    name: 'checkbox',
    component: Checkbox,
    meta: {
      title: 'checkbox'
    }
  },
  {
    path: '/switch',
    name: 'switch',
    component: Switch,
    meta: {
      title: 'switch'
    }
  },
  {
    path: '/toast',
    name: 'toast',
    component: Toast,
    meta: {
      title: 'toast'
    }
  },
  {
    path: '/tips',
    name: 'tips',
    component: Tips,
    meta: {
      title: 'tips'
    }
  },
  {
    path: '/searchBar',
    name: 'searchBar',
    component: SearchBar,
    meta: {
      title: 'searchBar'
    }
  },
  {
    path: '/bottomMenuBar',
    name: 'bottomMenuBar',
    component: BottomMenuBar,
    meta: {
      title: 'bottomMenuBar'
    }
  },
  {
    path: '/tabs',
    name: 'tabs',
    component: Tabs,
    meta: {
      title: 'tabs'
    }
  },
  {
    path: '/popUp',
    name: 'popUp',
    component: PopUp,
    meta: {
      title: 'popUp'
    }
  },
  {
    path: '/actionSheet',
    name: 'actionSheet',
    component: ActionSheet,
    meta: {
      title: 'actionSheet'
    }
  },
  {
    path: '/swiper',
    name: 'swiper',
    component: Swiper,
    meta: {
      title: 'swiper'
    }
  },
  {
    path: '/datePicker',
    name: 'datePicker',
    component: DatePicker,
    meta: {
      title: 'datePicker'
    }
  },
  {
    path: '/range',
    name: 'range',
    component: Range,
    meta: {
      title: 'range'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: 'home'
    }
  },
  {
    path: '/store',
    name: 'store',
    component: Store,
    meta: {
      title: 'store'
    }
  },
  {
    path: '/priceRange',
    name: 'priceRange',
    component: PriceRange,
    meta: {
      title: 'priceRange'
    }
  },
  {
    path: '/dialog',
    name: 'dialog',
    component: Dialog,
    meta: {
      title: 'dialog'
    }
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar,
    meta: {
      title: 'calendar'
    }
  },
  {
    path: '/cityPicker',
    name: 'cityPicker',
    component: CityPicker,
    meta: {
      title: 'cityPicker'
    }
  },
  {
    path: '/scrollLoad',
    name: 'scrollLoad',
    component: ScrollLoad,
    meta: {
      title: 'scrollLoad'
    }
  },
  {
    path: '/textareaLimit',
    name: 'textareaLimit',
    component: TextareaLimit,
    meta: {
      title: 'textareaLimit'
    }
  },
  {
    path: '/uploader',
    name: 'uploader',
    component: Uploader,
    meta: {
      title: 'uploader'
    }
  },
  {
    path: '/score',
    name: 'score',
    component: Score,
    meta: {
      title: 'score'
    }
  },
  {
    path: '/checkPhoto',
    name: 'checkPhoto',
    component: CheckPhoto,
    meta: {
      title: 'checkPhoto'
    }
  },
  {
    path: '/pullRefresh',
    name: 'pullRefresh',
    component: PullRefresh,
    meta: {
      title: 'pullRefresh'
    }
  }

]

export default componentsRoutes
