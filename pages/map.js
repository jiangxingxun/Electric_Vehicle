import React from 'react';
import { useRouter } from 'next/router';
import { Box, makeStyles } from '@material-ui/core';
import { POINTS, YEAR } from '../constants';
import { addMarker, generatePointers, addBlueMarker } from '../utils';
import { getRandomInt } from '../utils/util';
import Title from '../src/Title';

const useStyles = makeStyles({
  map: {
    width: '90%',
    height: '620px',
    margin: '0 auto'
  }
});

let map;
let points = [];

const addBluePointer = currentPoint => {
  const point = new BMap.Point(currentPoint.lng, currentPoint.lat);
  const opts = {
    title: currentPoint.title,
    n1: currentPoint.n1,
    n2: currentPoint.n2,
    n3: currentPoint.n3,
    p1: currentPoint.p1,
    p2: currentPoint.p2,
    p3: currentPoint.p3
  };
  addBlueMarker(map, point, opts);
};

const addPointer = (currentPoint, i) => {
  const point = new BMap.Point(currentPoint.lng, currentPoint.lat);
  const opts = {
    title: currentPoint.title,
    n1: i % 2 === 0 ? 12 + getRandomInt(3) : 12 - getRandomInt(3),
    n2: i % 2 === 0 ? 3 + getRandomInt(1) : 3 - getRandomInt(1),
    n3: getRandomInt(2),
    p1: i % 2 === 0 ? 100 + getRandomInt(11) : 100 - getRandomInt(11),
    p2: i % 2 === 0 ? 110 + getRandomInt(11) : 110 - getRandomInt(11),
    p3: i % 2 === 0 ? 90 + getRandomInt(11) : 90 - getRandomInt(11)
  };
  points.push({ point: currentPoint, options: opts });
  addMarker(map, point, opts);
  //i ? addMarker(map, point, opts) : addBlueMarker(map, point, opts);
};

const changePointer = point => {
  const target = points.find(p => p.point.lng === point.lng);
  const newPointer = {
    ...target,
    options: {
      ...target.options,
      n1: target.options.n1 + 1,
      n2: target.options.n2 + 1,
      n3: target.options.n3 + 1
    }
  };
  return newPointer;
};

export default function Map() {
  const router = useRouter();
  const classes = useStyles();

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

    // 创建27个标注
    for (let i = 0; i < 27; i++) {
      addPointer(POINTS[i], i);
    }

    const { invest, target } = JSON.parse(router.query.data);

    // 根据 data 计算新增和改变的点

    // 旧的随机添加逻辑
    // const newPointers = generatePointers(YEAR[invest[2]], target);
    // for (let i = 0; i < newPointers.length; i++) {
    //   const needChangePoint = POINTS[newPointers[i].changeIdx];
    //   const needAddPoint = POINTS[newPointers[i].addIdx];
    //   addPointer(changePointer(needChangePoint));
    //   addPointer(needAddPoint);
    // }

    // 新的添加固定点逻辑
    const newPointers = generatePointers(YEAR[invest[2]], target);
    for (let i = 0; i < newPointers.length; i++) {
      addBluePointer(newPointers[i]);
    }
  }, []);

  return (
    <React.Fragment>
      <Box my={5}>
        <Title />
        <Box mt={5}>
          <div id="map" className={classes.map} />
        </Box>
      </Box>
    </React.Fragment>
  );
}
