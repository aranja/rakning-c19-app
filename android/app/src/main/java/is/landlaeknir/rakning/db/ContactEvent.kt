package `is`.landlaeknir.rakning.db

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import java.util.*

@Entity(tableName = "contact_events")
data class ContactEvent(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    @ColumnInfo(name = "device_id") val deviceId: String,
    @ColumnInfo(name = "start_date") val startDate: Date,
    @ColumnInfo(name = "end_date") var endDate: Date,
    @ColumnInfo(name = "proximity") val proximity: String? = "far"
)