import React, { useState, memo } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { TextField } from "material-ui";
import { InputAdornment } from "material-ui";
import AddLocation from "@material-ui/icons/AddLocation";

const styles = theme => ({
  selectorRoot: {
    display: "flex",
    flexDirection: "column",
    background: "#FFFFFF",
    zIndex: 1,
    position: "relative"
  },
  selectorExpanded: {
    display: "flex",
    borderRadius: "5px 5px 0px 0px",
    borderLeft: "solid 1px #e4e4e6",
    borderRight: "solid 1px #e4e4e6",
    borderTop: "solid 1px #e4e4e6",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    height: "30px"
  },
  selectorNotExpanded: {
    display: "flex",
    borderRadius: "5px",
    border: "solid 1px #e4e4e6",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    height: "30px"
  },
  input: {
    display: "flex",
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.25",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#8e8e8e",
    paddingLeft: "10px"
  },
  iconExpand: {
    justifyContent: "center",
    alignItems: "center",
    borderLeft: "solid 1px #e4e4e6",
    borderRadius: "0px 5px 5px 0px",
    padding: "0px 10px 0px 10px",
    color: "#a7a7a7",
    height: "100%"
  },
  iconButton: {
    color: "#45459c",
    padding: 0
  },

  listPaper: {
    border: "solid 1px #e4e4e6",
    borderRadius: "0 0 5px 5px",
    display: "block",
    position: "absolute",
    zIndex: 1,
    width: "100%",
    background: "#FFFFFF",
    top: "30px"
  },
  root: { padding: 0 },
  textItem: {
    display: "flex",
    flex: 1,
    fontSize: 12,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.25",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#8e8e8e",
    paddingLeft: 12
  }
});

const Selector = ({
  placeholder,
  value,
  onChange,
  onComplete,
  options,
  disabled,
  onClickDisabled
}) => {
  const [optionsExpanded, setOptionsExpanded] = useState(false);

  const handleChange = newValue => {
    setOptionsExpanded(false);
    if (onChange) onChange(newValue);
    if (newValue && options && options.length > 0) setOptionsExpanded(true);
  };

  const handleClick = newValue => {
    setOptionsExpanded(false);
    if (onComplete) onComplete(newValue);
  };

  const classes = styles();
  return (
    <div className={classes.selectorRoot}>
      <div
        className={
          optionsExpanded
            ? classes.selectorExpanded
            : classes.selectorNotExpanded
        }
      >
        <TextField
          fullWidth
          autoComplete="off"
          className={classes.input}
          onChange={event => handleChange(event.target.value)}
          id="searcher"
          type="search"
          InputLabelProps={{
            shrink: true
          }}
          errorText="Requerido"
          label="Ciudad"
          placeholder={placeholder}
          value={value}
          //          error={props.error}
          //        helperText={props.error}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AddLocation />
              </InputAdornment>
            )
          }}
        />
      </div>
      {optionsExpanded && (
        <ListView list={options} selectItem={handleClick} value={value} />
      )}
    </div>
  );
};

export default Selector;

const ListView = memo(({ list, selectItem, emptyListText, value }) => {
  const classes = styles();

  return (
    <div className={classes.listPaper}>
      <List className={classes.root}>
        {list.map(
          item =>
            value !== item.label && (
              <ListViewItem
                key={`lisViewItem-${item.label}`}
                value={item.value}
                label={item.label}
                selectItem={selectItem}
                item={item}
              />
            )
        )}
        {list.length === 0 && (
          <ListItem className={classes.item}>
            <ListItemText
              className={classes.textItem}
              primary={emptyListText}
              disableTypography
            />
          </ListItem>
        )}
      </List>
    </div>
  );
});

const ListViewItem = memo(({ value, label, selectItem, item }) => {
  const classes = styles();
  return (
    <ListItem
      button
      divider
      onClick={() => {
        selectItem(item);
      }}
      style={{ padding: 8 }}
    >
      <ListItemText
        className={classes.textItem}
        primary={label}
        disableTypography
      />
    </ListItem>
  );
});
