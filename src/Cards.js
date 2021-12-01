import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cardWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '4px',
    padding: '60px 15px',
    background: '#f5f5f5'
  },
  card: {
    width: '45%'
  },
  media: {
    height: 140
  }
});

const Cards = ({ setActive, setComponent }) => {
  const classes = useStyles();

  const handleNavigateClick = () => {
    setActive([false, true, false]);
    setComponent(1);
  };

  const handleRuleClick = () => {
    setActive([false, false, true]);
    setComponent(2);
  };

  return (
    <div className={classes.cardWrapper}>
      <Card className={classes.card} onClick={handleNavigateClick}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/p1.jpg"
            title="导航模块"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              导航模块
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              导航:电动汽车寻找最优充电桩
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card className={classes.card} onClick={handleRuleClick}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/p2.jpg"
            title="规划模块"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              规划模块
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              规划:充电桩与充电站的规划
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default React.memo(Cards);
