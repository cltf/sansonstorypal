package com.sansheng.storypal

import android.media.MediaPlayer
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity

class BookPlaybackActivity : AppCompatActivity() {
    
    private lateinit var mediaPlayer: MediaPlayer
    private lateinit var playPauseButton: ImageButton
    private lateinit var progressBar: ProgressBar
    private lateinit var currentTimeText: TextView
    private lateinit var totalTimeText: TextView
    private lateinit var bookTitleText: TextView
    private lateinit var bookCoverImage: ImageView
    private lateinit var pageNumberText: TextView
    private lateinit var storyText: TextView
    
    private var isPlaying = false
    private var currentPage = 1
    private var totalPages = 10
    private val handler = Handler(Looper.getMainLooper())
    private var progressRunnable: Runnable? = null
    
    // 示例绘本数据
    private val bookData = BookData(
        title = "小王子",
        coverImage = R.drawable.img_2,
        totalPages = 10,
        pages = listOf(
            "从前有一个小王子，他住在一个很小的星球上...",
            "小王子每天都会清理他的星球，拔掉猴面包树的幼苗...",
            "有一天，一朵美丽的玫瑰花在小王子的星球上绽放了...",
            "玫瑰花很骄傲，总是要求小王子照顾她...",
            "小王子决定离开他的星球，去探索其他的星球...",
            "他遇到了一个国王，国王统治着整个宇宙...",
            "然后他遇到了一个商人，商人忙着数星星...",
            "小王子来到了地球，遇到了一个飞行员...",
            "飞行员教小王子什么是真正的友谊...",
            "最后，小王子明白了爱的真谛，回到了他的星球..."
        )
    )
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_book_playback)
        
        initializeViews()
        setupClickListeners()
        loadBookData()
        initializeMediaPlayer()
    }
    
    private fun initializeViews() {
        playPauseButton = findViewById(R.id.btnPlayPause)
        progressBar = findViewById(R.id.progressBar)
        currentTimeText = findViewById(R.id.tvCurrentTime)
        totalTimeText = findViewById(R.id.tvTotalTime)
        bookTitleText = findViewById(R.id.tvBookTitle)
        bookCoverImage = findViewById(R.id.ivBookCover)
        pageNumberText = findViewById(R.id.tvPageNumber)
        storyText = findViewById(R.id.tvStoryText)
    }
    
    private fun setupClickListeners() {
        findViewById<Button>(R.id.btnBack).setOnClickListener {
            finish()
        }
        
        findViewById<ImageButton>(R.id.btnPreviousPage).setOnClickListener {
            previousPage()
        }
        
        findViewById<ImageButton>(R.id.btnNextPage).setOnClickListener {
            nextPage()
        }
        
        playPauseButton.setOnClickListener {
            togglePlayPause()
        }
        
        findViewById<ImageButton>(R.id.btnRepeat).setOnClickListener {
            repeatCurrentPage()
        }
        
        findViewById<ImageButton>(R.id.btnSpeed).setOnClickListener {
            changePlaybackSpeed()
        }
    }
    
    private fun loadBookData() {
        bookTitleText.text = bookData.title
        bookCoverImage.setImageResource(bookData.coverImage)
        updatePageDisplay()
    }
    
    private fun initializeMediaPlayer() {
        // 创建模拟的MediaPlayer用于演示
        try {
            mediaPlayer = MediaPlayer()
            // 设置一个模拟的持续时间（3分45秒）
            mediaPlayer.setOnCompletionListener {
                isPlaying = false
                updatePlayPauseButton()
                stopProgressUpdate()
            }
            updateTotalTime()
        } catch (e: Exception) {
            Toast.makeText(this, "音频播放器初始化失败", Toast.LENGTH_SHORT).show()
        }
    }
    
    private fun togglePlayPause() {
        if (isPlaying) {
            pausePlayback()
        } else {
            startPlayback()
        }
    }
    
    private fun startPlayback() {
        if (::mediaPlayer.isInitialized) {
            // 模拟播放开始
            isPlaying = true
            updatePlayPauseButton()
            startProgressUpdate()
            Toast.makeText(this, "开始播放绘本音频", Toast.LENGTH_SHORT).show()
        }
    }
    
    private fun pausePlayback() {
        if (::mediaPlayer.isInitialized) {
            // 模拟暂停播放
            isPlaying = false
            updatePlayPauseButton()
            stopProgressUpdate()
            Toast.makeText(this, "暂停播放", Toast.LENGTH_SHORT).show()
        }
    }
    
    private fun updatePlayPauseButton() {
        playPauseButton.setImageResource(
            if (isPlaying) R.drawable.ic_pause else R.drawable.ic_play
        )
    }
    
    private fun previousPage() {
        if (currentPage > 1) {
            currentPage--
            updatePageDisplay()
            resetPlayback()
        }
    }
    
    private fun nextPage() {
        if (currentPage < totalPages) {
            currentPage++
            updatePageDisplay()
            resetPlayback()
        }
    }
    
    private fun updatePageDisplay() {
        pageNumberText.text = "第 $currentPage 页 / 共 $totalPages 页"
        storyText.text = bookData.pages[currentPage - 1]
    }
    
    private fun resetPlayback() {
        if (::mediaPlayer.isInitialized) {
            // 模拟重置播放位置
            if (isPlaying) {
                Toast.makeText(this, "重新播放当前页", Toast.LENGTH_SHORT).show()
            }
        }
    }
    
    private fun repeatCurrentPage() {
        resetPlayback()
        if (!isPlaying) {
            startPlayback()
        }
    }
    
    private fun changePlaybackSpeed() {
        if (::mediaPlayer.isInitialized) {
            // 模拟播放速度切换
            Toast.makeText(this, "切换播放速度", Toast.LENGTH_SHORT).show()
        }
    }
    
    private fun startProgressUpdate() {
        progressRunnable = object : Runnable {
            override fun run() {
                if (::mediaPlayer.isInitialized && isPlaying) {
                    // 模拟进度更新
                    val currentPosition = 0 // 模拟当前位置
                    val duration = 225000 // 3分45秒 = 225秒 = 225000毫秒
                    
                    progressBar.progress = (currentPosition * 100 / duration)
                    currentTimeText.text = formatTime(currentPosition)
                    
                    handler.postDelayed(this, 1000)
                }
            }
        }
        handler.post(progressRunnable!!)
    }
    
    private fun stopProgressUpdate() {
        progressRunnable?.let { handler.removeCallbacks(it) }
    }
    
    private fun updateTotalTime() {
        if (::mediaPlayer.isInitialized) {
            // 设置模拟的总时长（3分45秒）
            totalTimeText.text = formatTime(225000)
        }
    }
    
    private fun formatTime(milliseconds: Int): String {
        val seconds = milliseconds / 1000
        val minutes = seconds / 60
        val remainingSeconds = seconds % 60
        return String.format("%02d:%02d", minutes, remainingSeconds)
    }
    
    override fun onDestroy() {
        super.onDestroy()
        if (::mediaPlayer.isInitialized) {
            mediaPlayer.release()
        }
        stopProgressUpdate()
    }
    
    data class BookData(
        val title: String,
        val coverImage: Int,
        val totalPages: Int,
        val pages: List<String>
    )
}
