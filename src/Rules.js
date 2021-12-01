import React from 'react';
import Router from 'next/router';
import {
  makeStyles,
  Box,
  Select,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { POINTS } from '../constants';
import { getRandomInt } from '../utils/util';
import { addMarker } from '../utils';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex'
  },
  map: {
    height: '600px',
    flex: 2,
    marginRight: 10
  },
  form: {
    flex: 1
  },
  label: {
    marginBottom: 20
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  summary: {
    fontSize: '18px',
    cursor: 'pointer'
  },
  icon: {
    background: '#19857b',
    color: '#fff',
    fontSize: '1.1rem',
    borderRadius: '2px',
    marginLeft: '10px'
  },
  clearIcon: {
    background: '#e0e0e0',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '1.1rem',
    borderRadius: '2px',
    marginLeft: '10px'
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 0)
  },
  warning: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'red'
  }
}));

const initState = {
  invest: [20, 20, '', 20, 20, 20, 20],
  target: '0'
  // capacity: [20, 20, 20, 20],
};

let map;

const renderItem2 = (classes, state) => {
  return (
    <div className={classes.label}>
      <details>
        <summary className={classes.summary}>容量成本</summary>
        <div className={classes.item}>
          <DoneIcon className={classes.icon} />
          <div>充电机功率</div>
          <Select native value={20} disabled>
            <option value={96}>96kW</option>
          </Select>
        </div>
        <div className={classes.item}>
          <DoneIcon className={classes.icon} />
          <div>充电机配置上限</div>
          <Select native value={20} disabled>
            <option value={25}>25台</option>
          </Select>
        </div>
        <div className={classes.item}>
          <DoneIcon className={classes.icon} />
          <div>充电机配置下限</div>
          <Select native value={20} disabled>
            <option value={6}>6台</option>
          </Select>
        </div>
      </details>
    </div>
  );
};

const renderItem3 = (classes, state) => {
  return (
    <div className={classes.label}>
      <details>
        <summary className={classes.summary}>用户成本</summary>
        <div className={classes.item}>
          <DoneIcon className={classes.icon} />
          <div>充电电价</div>
          <Select native value={20} disabled>
            <option value={20}>0.7元/kW.h</option>
          </Select>
        </div>
        <div className={classes.item}>
          <DoneIcon className={classes.icon} />
          <div>城市道路曲折系数</div>
          <Select native value={20} disabled>
            <option value={13}>1.3</option>
          </Select>
        </div>
        <div className={classes.item}>
          <DoneIcon className={classes.icon} />
          <div>用户出行成本</div>
          <Select native value={20} disabled>
            <option value={20}>20</option>
          </Select>
        </div>
      </details>
    </div>
  );
};

const validate = state => {
  if (state.invest[2] === '') {
    return '请选择充电站运行年限';
  }
  return '';
};

const Rules = () => {
  const classes = useStyles();
  const [state, setState] = React.useState(initState);
  const [warning, setWarning] = React.useState('');

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

  const handleChange = e => {
    const invest = state.invest.map((inv, idx) => {
      if (idx === 2) return +e.target.value;
      return inv;
    });
    const newState = {
      ...state,
      invest
    };
    setState(newState);
  };

  const handleRadio = e => {
    const target = e.target.value;
    const newState = {
      ...state,
      target
    };
    setState(newState);
  };

  const handleSubmit = () => {
    const validateRes = validate(state);
    if (validateRes) {
      setWarning(validateRes);
      return;
    }
    setWarning('');
    window.open(`/map?data=${JSON.stringify(state)}`);
  };

  const handleReset = () => {
    setState(initState);
  };

  const renderItem1 = () => {
    return (
      <div className={classes.label}>
        <details open>
          <summary className={classes.summary}>投资成本</summary>
          <div className={classes.item}>
            <DoneIcon className={classes.icon} />
            <div>建设等效投资系数</div>
            <Select native value={state.invest[0]} disabled>
              <option value={2}>2</option>
            </Select>
          </div>
          <div className={classes.item}>
            <DoneIcon className={classes.icon} />
            <div>运行维护投资系数</div>
            <Select native value={state.invest[1]} disabled>
              <option value={8}>8</option>
            </Select>
          </div>
          <div className={classes.item}>
            {state.invest[2] ? (
              <DoneIcon className={classes.icon} />
            ) : (
              <ClearIcon className={classes.clearIcon} />
            )}
            <div>充电站运行年限</div>
            <Select native value={state.invest[2]} onChange={handleChange}>
              <option value="" />
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </Select>
          </div>
          <div className={classes.item}>
            <DoneIcon className={classes.icon} />
            <div>充电站贴现率</div>
            <Select native value={state.invest[3]} disabled>
              <option value={8}>0.08</option>
            </Select>
          </div>
          <div className={classes.item}>
            <DoneIcon className={classes.icon} />
            <div>商业区土地价格</div>
            <Select native value={state.invest[4]} disabled>
              <option value={8296}>0.8296</option>
            </Select>
          </div>
          <div className={classes.item}>
            <DoneIcon className={classes.icon} />
            <div>居民区土地价格</div>
            <Select native value={state.invest[5]} disabled>
              <option value={6174}>0.6174</option>
            </Select>
          </div>
          <div className={classes.item}>
            <DoneIcon className={classes.icon} />
            <div>工业区土地价格</div>
            <Select native value={state.invest[6]} disabled>
              <option value={2251}>0.2251</option>
            </Select>
          </div>
        </details>
      </div>
    );
  };

  const renderItem4 = () => {
    return (
      <div className={classes.label}>
        <details open>
          <summary className={classes.summary}>建设目标</summary>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            className={classes.group}
            value={state.target}
            onChange={handleRadio}
          >
            <FormControlLabel
              value="0"
              control={<Radio />}
              label="投资成本最小"
            />
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="充电站运营净现值"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="全社会总成本最小"
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="用户满意度最高"
            />
            <FormControlLabel value="4" control={<Radio />} label="联合优化" />
          </RadioGroup>
        </details>
      </div>
    );
  };

  return (
    <Box mt={5}>
      <div className={classes.container}>
        <div id="map" className={classes.map} />
        <div className={classes.form}>
          {renderItem1(classes, state)}
          {renderItem2(classes, state)}
          {renderItem3(classes, state)}
          {renderItem4(classes, state)}
          {warning && (
            <Box mt={3} className={classes.warning}>
              {warning}
            </Box>
          )}
          <div className={classes.buttonGroup}>
            <Button
              variant="contained"
              color="gray"
              className={classes.submit}
              onClick={handleReset}
            >
              重填
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              确认规划
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Rules;
