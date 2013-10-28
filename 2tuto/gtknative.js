#!/usb/bin/gjs

// Agregamos el soporte de GTK(Ventanas y Widgets) y el de Lang para la union
// con eventos y con el JavaScript
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;

const WelcomeToTheGrid = new Lang.Class({
  Name: 'Welcome to the Grid',

      //Crear la aplicacion en si
      _init: function() {
        this.application = new Gtk.Application();

        //Conectamos los estados 'activate' y 'startup' a las funciones callback
        this.application.connect('activate', Lang.bind(this, this._onActivate));
        this.application.connect('startup', Lang.bind(this, this._onStartup));

      },

      //Funcion Callback para la señal 'activate' presente en la ventana cuando esta 'activa'
      _onActivate: function() {
        this._window.present();
      },

      //Funcion Callback para la señal 'startup' que construye el UI
      _onStartup: function() {
        this._buildUI();
      },

      //Diseño del UI de la aplicacion
      _buildUI: function() {

        //Crear la ventana de la aplicacion
        this._window = new Gtk.ApplicationWindow({
          application: this.application,
          window_position: Gtk.WindowPosition.CENTER,
          border_width: 10,
          title: "Bienvenidos al Grid"});

        //Creamos una imagen
        this._image = new Gtk.Image ({file: "gnome-image.png" });

        //Creamos una imagen del catalogo principal
        this._icon = new Gtk.Image ({ stock: 'gtk-about' });

        //Creamos una etiqueta
        this._label = new Gtk.Label ({ 
          label: "Bienvenidos a GNOME, Gtk!!",
          margin_top: 20 });

        this._label2 = new Gtk.Label ({ label: "Este ejemplo con GTK mola!" });
        
        this._label3 = new Gtk.Label ({ label: "Agregando una nueva columna" });

        


        //Creamos la parrilla (Grid) para poner los elementos
        this._grid = new Gtk.Grid ({
            row_spacing: 20,
            column_spacing: 20,
          //    column_homogeneous: true,
        //    margin_right: 10,
        //    margin_left: 10
        });

        //Agregamos los elementos imagen y etiqueta a la parrilla
        // en la imagen identificamos que va a ocupar dos celdillas
        this._grid.attach (this._image, 0, 1, 2, 1);
        this._grid.attach (this._label, 1, 2, 1, 1);
        this._grid.attach (this._label2, 1, 0, 2, 1);
//        this._grid.attach (this._label3, 2, 2, 1, 1);
        this._grid.attach (this._icon, 0, 2, 1, 1);

        //Añadimos a la ventana la rejilla
        this._window.add (this._grid);

        //Mostramos la ventana y los widgets en ella
        this._window.show_all();
      }
});

//Ejecutamos la aplicacion
      let app = new WelcomeToTheGrid();
      app.application.run(ARGV);

