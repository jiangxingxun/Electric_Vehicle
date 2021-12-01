import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { POINTS } from '../constants';
import { addMarker, geocoder, findCharger } from '../utils';
import { getRandomInt } from '../utils/util';

const useStyles = makeStyles({
  map: {
    width: '100%',
    height: '600px'
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const validate = (start, end) => {
  if (!start || !end) return false;
  return true;
};

let map;
let driving1;
let driving2;

/**
 * 路径规划
 */

const searchStep1 = (startPoint, chargerPoint) => {
  const start = new BMap.Point(startPoint.lng, startPoint.lat);
  const charger = new BMap.Point(chargerPoint.lng, chargerPoint.lat);
  driving1.search(start, charger);
};

const searchStep2 = (chargerPoint, endPoint) => {
  const charger = new BMap.Point(chargerPoint.lng, chargerPoint.lat);
  const end = new BMap.Point(endPoint.lng, endPoint.lat);
  driving2.search(charger, end);
};


const search = (startPoint, chargerPoint, endPoint) => {
  // 清除最近一次检索的结果
  driving1.clearResults();
  driving2.clearResults();

  const start = new BMap.Point(startPoint.lng, startPoint.lat);
  const charger = new BMap.Point(chargerPoint.lng, chargerPoint.lat);
  const end = new BMap.Point(endPoint.lng, endPoint.lat);

  //driving1.search(start, end, { waypoints: [charger] });
  searchStep1(startPoint, chargerPoint);
  searchStep2(chargerPoint, endPoint);
};


const Navigator = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({ start: '', end: '' });

  // TODO: 分析在 geocoder 中拿不到 map 的原因
  // let map;

  React.useEffect(() => {
    // 创建地图实例
    map = new BMap.Map('map');
    const centerPoint = new BMap.Point(112.904555, 23.16992);
    // 初始化地图，设置中心点坐标和地图级别
    map.centerAndZoom(centerPoint, 11);
    // 设置地图显示的城市
    map.setCurrentCity('佛山');
    // 开启鼠标滚轮缩放
    map.enableScrollWheelZoom(true);


    const ctrl = new BMapLib.TrafficControl({
      showPanel: true //是否显示路况提示面板
    });
    map.addControl(ctrl);
    ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);


    driving1 = new BMap.DrivingRoute(map, {
      renderOptions: {
        map,
        autoViewport: true
      }
    });
    
    
    driving2 = new BMap.DrivingRoute(map, {
      renderOptions: {
        map,
        autoViewport: true
      }
    });
    

    // 创建27个标注
    for (let i = 0; i < 27; i++) {
      const point = new BMap.Point(POINTS[i].lng, POINTS[i].lat);
      const opts = {
        title: POINTS[i].title,
        n1: i % 2 === 0 ? 12 + getRandomInt(3) : 12 - getRandomInt(3),
        n2: i % 2 === 0 ? 3 + getRandomInt(1) : 3 - getRandomInt(1),
        n3: getRandomInt(2),
        p1: i % 2 === 0 ? 100 + getRandomInt(11) : 100 - getRandomInt(11),
        p2: i % 2 === 0 ? 110 + getRandomInt(11) : 110 - getRandomInt(11),
        p3: i % 2 === 0 ? 90 + getRandomInt(11) : 90 - getRandomInt(11)
      };
      addMarker(map, point, opts);
    }
  }, []);

  const handleChange = name => e => {
    setState({
      ...state,
      [name]: e.target.value
    });
  };

  const handleSubmit = () => {
    const { start, end } = state;
    if (!validate(start, end)) {
      return;
    }

    let startPoint;
    let endPoint;
    // 1. 根据地名计算经纬度
    geocoder(start, point => {
      startPoint = point;
      geocoder(end, point => {
        endPoint = point;
        // 2. 找出最近的充电站
        const chargerPoint = findCharger(startPoint, endPoint);
        // console.log(map);
        // 3. 规划路线
        search(startPoint, chargerPoint, endPoint);
      });
    });
  };

  return (
    <div>
      <div className={classes.form}>
        <TextField
          required
          id="start"
          label="起点"
          name="start"
          autoFocus
          onChange={handleChange('start')}
        />
        <TextField
          required
          name="end"
          label="终点"
          id="end"
          onChange={handleChange('end')}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          确定
        </Button>
      </div>
      <Box mt={5}>
        <div id="map" className={classes.map} />
      </Box>
    </div>
  );
};

export default Navigator;
