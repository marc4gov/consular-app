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
    Checkbox,
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
    title: 'Caribbean Visa',
    link: 'caribvisa',
  },
  {
    img: '/images/paspoort.jpeg',
    title: 'Travel document',
    link: 'traveldoc',
  },
  {
    img: '/images/legalisatie.jpeg',
    title: 'Legalization',
    link: 'legal',
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
        Session.set("appType", {"name": tile.title, "image": tile.img})
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