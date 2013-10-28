#!/usr/bin/gjs

const Gtk = imports.gi.Gtk;
const Lang = imports.lang;

// Comenzamos con 0 galletas
var cookies = 0;

const GettingTheSignal = new Lang.Class({
    Name: 'Getting the Signal',

      //Creamos la aplicacion
      _init: function() {
          this.application = new Gtk.Application();

          //Conectamos 'activate' y 'startup' a las funciones callback
          this.application.connect('activate', Lang.bind(this, this._onActivate));
          this.application.connect('startup', Lang.bind(this, this._onStartup));
      },

      //Funcion callback para la señal 'activate' que existe cuando la ventana esta activa
      _onActivate: function() {
        thiw._window.present();
      },

      //Funcion callback para 'startup' que construye el UI
      _onStartup: function() {
        this._buildUI();
      },

      //Construimos el interfaz de la app
      _buildUI: function() {
        //Creamos la ventana
        this._window = new Gtk.ApplicationWindow({
          application: this.application,
          window_position: Gtk.WindowPosition.CENTER,
          default_height: 200,
          default_width: 400,
          title: "Pulsa el boton para conseguir galletitas!"});

        //Creamos la etiqueta label que identifica las galletas
        this._cookieLabel = new Gtk.Label ({
          label: "Numero de galletitas: "+ cookies });

        //Creamos el boton de las galletitas
        this._cookieButton = new Gtk.Button ({ label: "Galletas!" });

        //Conectamos el boton con la funcion que lo gestiona cuando se pulsa en el
        this._cookieButton.connect ('clicked', Lang.bind(this, this._getACookie));

        //Creamos el Grid que alojara todos los widgets
        this._grid = new Gtk.Grid ({
          halign: Gtk.Align.CENTER,
          valign: Gtk.Align.CENTER,
          row_spacing: 20 });

        //Ponemos todo en el grid
        this._grid.attach (this._cookieButton, 0, 0, 1, 1);
        this._grid.attach (this._cookieLabel, 0, 1, 1, 1);

        //Agregamos el grid a la ventana
        this._window.add (this._grid);

        //Mostramos todo
        this._window.show_all();

      },

      _getACookie: function() {

        //Incrementamos el numero de galletitas en 1 y actualizamos la etiqueta
        cookies++;
        this._cookieLabel.set_label("Numero de galletitas: " + cookies);
      }

});

 //Ejecutamos la app
 let app = new GettingTheSignal ();
 app.application.run(ARGV);
