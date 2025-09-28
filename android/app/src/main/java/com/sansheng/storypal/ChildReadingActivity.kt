package com.sansheng.storypal

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class ChildReadingActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_child_reading)
        
        setupClickListeners()
    }
    
    private fun setupClickListeners() {
        findViewById<Button>(R.id.btnAge3to6).setOnClickListener {
            startBookPlayback("3-6岁绘本")
        }
        
        findViewById<Button>(R.id.btnAge7to9).setOnClickListener {
            startBookPlayback("7-9岁绘本")
        }
        
        findViewById<Button>(R.id.btnAge10to12).setOnClickListener {
            startBookPlayback("10-12岁绘本")
        }
        
        findViewById<Button>(R.id.btnBack).setOnClickListener {
            finish()
        }
    }
    
    private fun startBookPlayback(bookCategory: String) {
        val intent = Intent(this, BookPlaybackActivity::class.java)
        intent.putExtra("book_category", bookCategory)
        startActivity(intent)
    }
    
    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}
