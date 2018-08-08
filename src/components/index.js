/*
* @Author: UEDHE
* @Date:   2018-05-10 16:28:30
* @Last Modified by:   UEDHE
* @Last Modified time: 2018-07-24 11:42:00
*/
import Vue from 'vue'
import Tabbar from './tabbar/tabbar'
import TabbarItem from './tabbarItem/tabbarItem'
import Badge from './badge/badge'
import Header from './header/header'
import Dialog from './dialog/dialog'
import Cells from './cells/cells'
import CellsItem from './cellsItem/cellsItem'
import Button from './button/button'
import Radio from './radio/radio'
import Checkbox from './checkbox/checkbox'
import Switch from './switch/switch'
import Swiper from './swiper/swiper'
import SearchBar from './searchBar/searchBar'
import Tabs from './tabs/tabs'
import PopUp from './popUp/popUp'
import DatePicker from './datePicker/datePicker'
import Range from './range/range'
import PriceRange from './priceRange/priceRange'
import Calendar from './calendar/calendar'
import CityPicker from './cityPicker/cityPicker'
import ScrollLoad from './scrollLoad/scrollLoad'
import TextareaLimit from './textareaLimit/textareaLimit'
import Uploader from './uploader/uploader'
import Score from './score/score'
import Ewm from './ewm/ewm'
import CheckPhoto from './checkPhoto/checkPhoto'
import PullRefresh from './pullRefresh/pullRefresh'

const components = [
  Tabbar,
  TabbarItem,
  Badge,
  Header,
  Dialog,
  Cells,
  CellsItem,
  Button,
  Radio,
  Checkbox,
  Switch,
  Swiper,
  SearchBar,
  Tabs,
  PopUp,
  DatePicker,
  Range,
  PriceRange,
  Calendar,
  CityPicker,
  ScrollLoad,
  TextareaLimit,
  Uploader,
  Score,
  Ewm,
  CheckPhoto,
  PullRefresh
]

// 将所有组件保存到vue上后面在页面上可以直接使用daq-tabbar
for (let i = 0; i < components.length; i++) {
  Vue.component(components[i].name, components[i])
}
