package `is`.landlaeknir.rakning.db

import androidx.room.*

@Dao
interface ContactEventDao {
    @Query("SELECT * FROM contact_events")
    fun getAll(): List<ContactEvent>

    @Transaction
    @Query("SELECT * FROM contact_events WHERE device_id = :deviceId ORDER BY start_date DESC LIMIT 1")
    fun getLastByDeviceId(deviceId: String): ContactEvent?

    @Transaction
    @Insert
    fun create(contactEvent: ContactEvent)

    @Transaction
    @Update
    fun update(contactEvent: ContactEvent)
}
