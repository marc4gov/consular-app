var {
    AppCanvas,
    AppBar,
    Styles,
    RaisedButton,
    Card,
    CardHeader,
    CardActions,
    CardMedia,
    CardTitle,
    CardText,
    FlatButton,
    IconButton,
    IconMenu,
    GridList,
    GridTile,
    StarBorder,
    MenuItem,
    ActionAndroid,
    DatePicker
    } = MUI;

const {
  SvgIcons
} = MUI.Libs

var { ThemeManager, LightRawTheme } = Styles;

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 400,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

const tilesData = [
  {
    img: '/images/schengenvisa.jpeg',
    title: 'Schengen Visa',
    link: 'schengenvisa',
  },
  {
    img: '/images/caribvisa.jpeg',
    title: 'Caribisch Visa',
    link: 'caribvis',
  },
  {
    img: '/images/paspoort.jpeg',
    title: 'Paspoort',
    link: 'paspoort',
  },
  {
    img: '/images/legalisatie.jpeg',
    title: 'Legalisatie',
    link: 'legalisatie',
  }
];

GridListSimple = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
 
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        };
    },

    getComponent: function(tile) {
        console.log(tile.title);
        FlowRouter.go('/'+ tile.link)
    },
 
    render: function () {
        //let VIcon = <SvgIcons.MoreVertIcon />

        return (
            <AppCanvas>
            
    <GridList
      cellHeight={200}
      style={styles.gridList}
    >
      {tilesData.map(tile => (
        <GridTile
          key={tile.img}
          title={tile.title}
          onClick={this.getComponent.bind(this, tile)}
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>

      </AppCanvas>
        );
    }
});