import "./datatables.css";
import React, { Component } from "react";
import $ from "jquery";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-editor-dt/css/editor.dataTables.min.css";
import "datatables.net-select-dt/css/select.dataTables.min.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
require("datatables.net");
require("datatables.net-buttons");
require("datatables.net-buttons/js/buttons.print.min.js");
require("datatables.net-select");
require("datatables.net-editor");

export class Tbl extends Component {
  constructor(props) {
    super(props);
    this.dataTable = null;
    this.editor = null;
  }

  componentDidMount() {
    this.$el = $(this.el);
    var editor;
    editor = new $.fn.dataTable.Editor({
      ajax: {
        create: {
          type: "POST",
          url: "https://74xyrsvn3l.execute-api.us-east-1.amazonaws.com/dev/items",
        },
        edit: {
          type: "POST",
          url: "https://74xyrsvn3l.execute-api.us-east-1.amazonaws.com/dev/items",
        },
        remove: {
          type: "POST",
          url: "https://74xyrsvn3l.execute-api.us-east-1.amazonaws.com/dev/items",
        },
      },
      table: this.$el,
      fields: [
        
        { label: "venue:", name: "venue" },
        { label: "venue2:", name: "venue2" },
        { label: "item:", name: "item" },
        { label: "amount:", name: "amount" },
        { label: "unit:", name: "unit" },
        { label: "who_where:", name: "who_where" },
        { label: "vendor:", name: "vendor" },
        { label: "pri_owner_id:", name: "pri_owner_id" },
        { label: "fa_manager:", name: "fa_manager" },
        { label: "org_group:", name: "org_group" },
        { label: "notes:", name: "notes" },
        { label: "event:", name: "event" },
        { label: "responsible:", name: "responsible" },
        { label: "changed_by:", name: "changed_by" },
        { label: "changed_on:", name: "changed_on" }
      ],
    });

    this.editor = editor;
    this.dataTable = this.$el.DataTable({
      dom: "Bfrtip",
      "pageLength": 50,

      ajax: { 
        url:"https://74xyrsvn3l.execute-api.us-east-1.amazonaws.com/dev/items",
        type: "POST"
        },
      columns: [
        { title: "venue", data: "venue" },
        { title: "venue2", data: "venue2" },
        { title: "item", data: "item" },
        { title: "amount", data: "amount" },
        { title: "unit", data: "unit" },
        { title: "who_where", data: "who_where" },
        { title: "vendor", data: "vendor" },
        { title: "pri_owner_id", data: "pri_owner_id" },
        { title: "fa_manager", data: "fa_manager" },
        //{ title: "org_group", data: "org_group" },
        { title: "notes", data: "notes" },
        { title: "event", data: "event" },
        { title: "responsible", data: "responsible" },
        { title: "changed_by:", data: "changed_by" },
        { title: "changed_on:", data: "changed_on" }
      ],
      select: {
        style: "os",
        selector: "td:first-child",
      },
      buttons: [
        { extend: "create", editor: this.editor },
        { extend: "edit", editor: this.editor },
        { extend: "remove", editor: this.editor },
      ],
    });
    
  }

  componentWillUnmount() {
    this.dataTable.destroy(true);
  }


  editor = () => {
    return this.editor;
  };

  render() {
    return (
      <div>
        <table
          className="display"
          width="100%"
          ref={(el) => (this.el = el)}
        ></table>
      </div>
    );
  }
}

export default Tbl;
