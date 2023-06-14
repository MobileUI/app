var apps = []
var appIndexSelected = null

function getApps() {
    var store = localStorage.getItem('apps')
    if(store) apps = JSON.parse(store)

    checkAndHideOrShowAddButton()

}

getApps()

function checkAndHideOrShowAddButton() {
    if(apps.length) {
        MobileUI.show('buttonAddApp')
        MobileUI.hide('formCadaster')
    } else {
        MobileUI.hide('buttonAddApp')
        MobileUI.show('formCadaster')
    }
}

function storeApps() {
    if(apps.length) {
        localStorage.setItem('apps', JSON.stringify(apps))
    } else {
        localStorage.removeItem('apps')
    }
}

function addApp(){
    var obj = MobileUI.objectByForm('formCadaster')
    if(!obj.app) return alert('you need input a URL or App Code in form to save!', 'Alert')

    apps.push(obj)
    storeApps()
    MobileUI.clearForm('formCadaster')
    openToast('App created successfully!')
    checkAndHideOrShowAddButton()
}

function openPopoverApp(appIndex) {
    appIndexSelected = appIndex
    openPopover('popover')
}

function removeAppSelected() {
    apps.splice(appIndexSelected, 1)
    storeApps()
    checkAndHideOrShowAddButton()
}

function showAddApp() {
    MobileUI.hide('buttonAddApp')
    MobileUI.show('formCadaster')
}

function openApp(app) {

    if(!window.cordova || !window.cordova.InAppBrowser) {
        window.location.replace(app)
        return false
    }

    var params = 'location=no,zoom=no,fullscreen=no'
    if(app.indexOf('inappbrowser') !== -1) {
        params = app.split('inappbrowser=')[1].split('&')[0]
    }
    cordova.InAppBrowser.open(app, '_blank', params)
}

