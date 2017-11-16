import React  from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';

const styles = theme => ({
  cardContainer: {
    display: 'flex',
    padding: theme.spacing.unit*2,
  },
  card: {
    width: 250,
    height: 250,
    marginRight: theme.spacing.unit*2
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  cardActions: {
    bottom: 0,
    position: 'relative'
  }
});

const reportCardContent = [
  {
    title: "Products Used",
    content: "Overview of all the products used for the job",
    link: "product",
  },
  {
    title: "Itemised Client Invoice",
    content: "Customer invoice listing client costs for all products used on the job",
    link: "invoice"
  }
];

const ReportCard = (props) => {
  return (
    <div>
      <Card className={props.classes.card}>
        <CardContent>
          <Typography type="body1" className={props.classes.title}>
            Job report #{props.index+1}
          </Typography>
          <Typography type="headline" component="h2">
            {props.title}
          </Typography>
          <Typography component="p">
            {props.content}
          </Typography>
        </CardContent>
        <CardActions className={props.classes.cardActions}>
          <Link to={{ pathname: `/reports/${props.jobId}` }}>
            <Button dense>View report</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  )
};

const AvailableReports = props => {
  const {classes} = props;
  return (
    <div className={classes.cardContainer}>
      {reportCardContent.map((card, index) => {
        return <ReportCard classes={classes} {...card} {...props} index={index} key={index} />
      })}

    </div>
  )
};

export default withStyles(styles)(AvailableReports);