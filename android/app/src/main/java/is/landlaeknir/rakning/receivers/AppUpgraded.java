package is.landlaeknir.rakning.receivers;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import com.marianhello.bgloc.service.LocationServiceImpl;

public class AppUpgraded extends BroadcastReceiver {
    @Override
    public void onReceive(final Context context, Intent intent) {
        // Restart the location service on update.
        Intent locationServiceIntent = new Intent(context, LocationServiceImpl.class);
        locationServiceIntent.addFlags(Intent.FLAG_FROM_BACKGROUND);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(locationServiceIntent);
        } else {
            context.startService(locationServiceIntent);
        }
    }
}
