import {
  POINTS,
  PATTERN,
  YEAR_POINTS_5,
  YEAR_POINTS_10,
  YEAR_POINTS_15
} from '../constants';

/**
 * 将地址解析为经纬度，解析的结果在 cb 的参数里。
 */
export const geocoder = (target, cb) => {
  const myGeo = new BMap.Geocoder();
  myGeo.getPoint(target, cb, '佛山市');
};

// 信息窗口内容
const content = ({ title, n1, n2, n3, p1, p2, p3 }) =>
  `<h3 style='margin:0 0 5px 0;padding:0.2em 0'>位置信息：${title}</h3>` +
  `<p style='margin:0;line-height:1.5;font-size:13px;'>单相交流桩：${n1}台</p>` +
  `<p style='margin:0;line-height:1.5;font-size:13px;'>三相交流桩：${n2}台</p>` +
  `<p style='margin:0;line-height:1.5;font-size:13px;'>直流交流桩：${n3}台</p>` +
  `<p style='margin:0;line-height:1.5;font-size:13px;'>单相交流桩功率：${p1}kw</p>` +
  `<p style='margin:0;line-height:1.5;font-size:13px;'>三相交流桩功率：${p2}kw</p>` +
  `<p style='margin:0;line-height:1.5;font-size:13px;'>直流交流桩功率：${p3}kw</p>`;

/**
 * 创建标注
 */
export const addMarker = (map, point, opts) => {
  const marker = new BMap.Marker(point);
  map.addOverlay(marker);

  const infoWindow = new BMap.InfoWindow(content(opts));

  marker.addEventListener('click', function() {
    map.openInfoWindow(infoWindow, point); //开启信息窗口
  });
};

/**
 * 添加自定义icon的标注
 */
export const addBlueMarker = (map, point, opts) => {
  const myIcon = new BMap.Icon('./static/icon.png', new BMap.Size(19, 25));
  const marker = new BMap.Marker(point, { icon: myIcon });
  map.addOverlay(marker);

  const infoWindow = new BMap.InfoWindow(content(opts));

  marker.addEventListener('click', function() {
    map.openInfoWindow(infoWindow, point); //开启信息窗口
  });
};

/**
 * 根据经纬度计算两点距离
 */
const rad = d => {
  return (d * Math.PI) / 180.0;
};

const getDistance = (point1, point2) => {
  const lat1 = point1.lat;
  const lng1 = point1.lng;
  const lat2 = point2.lat;
  const lng2 = point2.lng;

  const radLat1 = rad(lat1);
  const radLat2 = rad(lat2);
  const a = radLat1 - radLat2;
  const b = rad(lng1) - rad(lng2);
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  return s;
};

/**
 * 找到距离起点和终点最近的充电站
 */
export const findCharger = (startPoint, endPoint) => {
  // start -> c -> end 的最小距离
  let minC = Number.MAX_SAFE_INTEGER;
  // target point
  let minPoint = {};

  for (let i = 0; i < 27; i++) {
    const currDistance1 = getDistance(startPoint, POINTS[i]);
    const currDistance2 = getDistance(POINTS[i], endPoint);
    if (minC > currDistance1 + currDistance2) {
      minC = currDistance1 + currDistance2;
      minPoint = POINTS[i];
    }
  }

  return minPoint;
};

/**
 * 找到需要改变的点
 * @param {Number} year 0 | 1 |2
 * @param {String} target 0 | 1 | 2 | 3 | 4
 */
export const generatePointers = (year, target) => {
  // 旧的找点逻辑
  // let results = [PATTERN[target][year]];
  // return results;

  // 新的找点逻辑
  let results;
  if (year === 0) {
    results = YEAR_POINTS_5[target];
  } else if (year === 1) {
    results = YEAR_POINTS_10[target];
  } else if (year === 2) {
    results = YEAR_POINTS_15[target];
  }
  return results;
};
