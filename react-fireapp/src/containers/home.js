import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';

const styles = theme => ({
  card: {
    maxWidth: 300,
    height: 350,
    marginRight: theme.spacing.unit*2
  },
  media: {
    height: 125,
  },
  cardContainer: {
    position: 'relative',
    display: 'flex',
    padding: theme.spacing.unit*2,
  },
  actions: {
    position: 'absolute',
    bottom: theme.spacing.unit*2,
  }
});

const SimpleMediaCard = (props) => {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={props.imagePath}
          title={props.title}
        />
        <CardContent>
          <Typography type="headline" component="h2">
            {props.title}
          </Typography>
          <Typography component="p">
            {props.content}
          </Typography>
        </CardContent>
        <div className={classes.actions}>
          <CardActions >
            <Button dense color="primary">
              <Link to={{ pathname: props.linkTo}}>Open</Link>
            </Button>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

const cards = [
  {
    imagePath: "https://firebasestorage.googleapis.com/v0/b/fire-app-9c904.appspot.com/o/users.png?alt=media&token=a277826a-33db-4bfe-9d4e-c3ad56f18dc0",
    title: "Users",
    content: "View, create and edit users and manage permissions",
    linkTo: "/admin/users"
  },
  {
    imagePath: "https://firebasestorage.googleapis.com/v0/b/fire-app-9c904.appspot.com/o/products.png?alt=media&token=339da45b-2cc4-4b21-9df1-e83739f39981",
    title: "Products",
    content: "View, create and edit users and products",
    linkTo: "/admin/products"
  },
  {
    imagePath: "https://firebasestorage.googleapis.com/v0/b/fire-app-9c904.appspot.com/o/companies.png?alt=media&token=c9f2c090-3fc3-42d2-9236-24eb6b215565",
    title: "Companies",
    content: "View, create and edit companies and clients",
    linkTo: "/admin/companies"
  },
  {
    imagePath: "https://firebasestorage.googleapis.com/v0/b/fire-app-9c904.appspot.com/o/jobs.png?alt=media&token=8080b71a-a2aa-431e-890c-53e810c80ca2",
    title: "Jobs",
    content: "Create new jobs, view ongoing jobs and manage worker entries",
    linkTo: "/jobs"
  },
  {
    imagePath: "https://firebasestorage.googleapis.com/v0/b/fire-app-9c904.appspot.com/o/reports.png?alt=media&token=3c5987e6-3c6a-4129-a0b0-82d66790ce1d",
    title: "Reports",
    content: "View client and product reports for ongoing jobs",
    linkTo: "/reports"
  }
];

const Home = props => {
  const { classes } = props;
  return (
    <div className={classes.cardContainer}>
    {
      cards.map((card, index) => <SimpleMediaCard key={index}
                                                  imagePath={card.imagePath}
                                                  title={card.title}
                                                  content={card.content}
                                                  linkTo={card.linkTo}
                                                  classes={classes}
    />)
    }
    </div>
  )
};

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);