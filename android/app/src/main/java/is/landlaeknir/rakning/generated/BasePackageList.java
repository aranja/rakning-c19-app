package is.landlaeknir.rakning.generated;

import java.util.Arrays;
import java.util.List;
import org.unimodules.core.interfaces.Package;

public class BasePackageList {
  public List<Package> getPackageList() {
    return Arrays.<Package>asList(
        new expo.modules.constants.ConstantsPackage(),
        new expo.modules.filesystem.FileSystemPackage(),
        new expo.modules.font.FontLoaderPackage(),
        new expo.modules.lineargradient.LinearGradientPackage(),
        new expo.modules.localization.LocalizationPackage(),
        new expo.modules.permissions.PermissionsPackage(),
        new expo.modules.securestore.SecureStorePackage(),
        new expo.modules.webbrowser.WebBrowserPackage()
    );
  }
}
