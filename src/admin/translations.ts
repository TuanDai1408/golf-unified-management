// 번역 파일 - 모든 UI 텍스트의 다국어 지원
// File dịch - hỗ trợ đa ngôn ngữ cho tất cả văn bản UI
// Translation file - multilingual support for all UI text

export type Language = 'vi' | 'ko' | 'en';

export interface Translations {
    // Navigation / Điều hướng / 탐색
    nav: {
        dashboard: string;
        bookings: string;
        clubs: string;
        slotManagement: string;
        users: string;
        reports: string;
        inventory: string;
        finance: string;
        settings: string;
        logout: string;
    };

    // Dashboard / Bảng điều khiển / 대시보드
    dashboard: {
        title: string;
        subtitle: string;
        aiInsights: string;
        analyzing: string;
        exportReport: string;
        performanceAnalysis: string;
        totalRevenue: string;
        totalBookings: string;
        brokerCommission: string;
        activeCourses: string;
        revenueAnalytics: string;
        revenueSubtitle: string;
        revenue: string;
        commission: string;
        liveActivity: string;
        viewAll: string;
        justNow: string;
        minutesAgo: string;
        booked: string;
        modifiedReservation: string;
        paidInvoice: string;
    };

    // Bookings / Đặt chỗ / 예약
    bookings: {
        title: string;
        subtitle: string;
        addBooking: string;
        exportData: string;
        searchPlaceholder: string;
        filterAll: string;
        filterConfirmed: string;
        filterPending: string;
        filterCancelled: string;
        tableId: string;
        tableCustomer: string;
        tableCourse: string;
        tableDate: string;
        tableSlot: string;
        tablePlayers: string;
        tablePrice: string;
        tableStatus: string;
        tablePayment: string;
        tableActions: string;
        statusConfirmed: string;
        statusPending: string;
        statusCancelled: string;
        paymentPaid: string;
        paymentPending: string;
        actionView: string;
        actionEdit: string;
        actionCancel: string;
    };

    // Clubs / Sân golf / 골프장
    clubs: {
        title: string;
        subtitle: string;
        addClub: string;
        searchPlaceholder: string;
        viewDetails: string;
        editClub: string;
        filterAll: string;
        totalHoles: string;
        holes: string;
        par: string;
        rating: string;
        avgRating: string;
        reviews: string;
        bookingsToday: string;
        amenities: string;
        statusMaintenance: string;
        quickFilter: string;
        clubhouse: string;
        proShop: string;
        restaurant: string;
        drivingRange: string;
        puttingGreen: string;
        caddies: string;
        carts: string;
        lockers: string;
    };

    // Users / Người dùng / 사용자
    users: {
        title: string;
        subtitle: string;
        addUser: string;
        exportUsers: string;
        searchPlaceholder: string;
        filterAll: string;
        filterAdmin: string;
        filterBroker: string;
        filterGolfer: string;
        totalUsers: string;
        activeAdmins: string;
        managers: string;
        pendingInvites: string;
        userProfile: string;
        noChange: string;
        actionNeeded: string;
        tableId: string;
        tableName: string;
        tableEmail: string;
        tableRole: string;
        tableBookings: string;
        tableRevenue: string;
        tableJoined: string;
        tableActions: string;
        roleAdmin: string;
        roleBroker: string;
        roleGolfer: string;
        roleStaff: string;
        actionView: string;
        actionEdit: string;
        actionDelete: string;
    };

    // Slots / Quản lý slot / 슬롯 관리
    slots: {
        title: string;
        subtitle: string;
        createSlot: string;
        bulkUpload: string;
        selectCourse: string;
        selectDate: string;
        timeSlot: string;
        capacity: string;
        booked: string;
        price: string;
        status: string;
        actions: string;
        statusAvailable: string;
        statusLimited: string;
        statusFull: string;
        statusClosed: string;
        actionEdit: string;
        actionClose: string;
        actionOpen: string;
    };

    // Reports / Báo cáo / 보고서
    reports: {
        inventory: string;
        stats: string;
    };

    // Header / Tiêu đề / 헤더
    header: {
        breadcrumb: string;
        searchPlaceholder: string;
        notifications: string;
        adminName: string;
        adminRole: string;
    };

    // Common / Chung / 공통
    common: {
        save: string;
        cancel: string;
        delete: string;
        edit: string;
        view: string;
        search: string;
        filter: string;
        export: string;
        import: string;
        refresh: string;
        loading: string;
        noData: string;
        confirm: string;
        close: string;
    };
}

export const translations: Record<Language, Translations> = {
    vi: {
        nav: {
            dashboard: 'Bảng điều khiển',
            bookings: 'Đặt chỗ',
            clubs: 'Sân Golf',
            slotManagement: 'Quản lý Slot',
            users: 'Người dùng',
            reports: 'Báo cáo',
            inventory: 'Kho hàng',
            finance: 'Tài chính',
            settings: 'Cài đặt',
            logout: 'Đăng xuất',
        },
        dashboard: {
            title: 'Tổng quan Bảng điều khiển',
            subtitle: 'Số liệu hiệu suất và hoạt động thời gian thực cho hôm nay.',
            aiInsights: 'Phân tích AI',
            analyzing: 'Đang phân tích...',
            exportReport: 'Xuất báo cáo',
            performanceAnalysis: 'Phân tích hiệu suất',
            totalRevenue: 'Tổng doanh thu',
            totalBookings: 'Tổng đặt chỗ',
            brokerCommission: 'Hoa hồng môi giới',
            activeCourses: 'Sân đang hoạt động',
            revenueAnalytics: 'Phân tích doanh thu',
            revenueSubtitle: 'Thu nhập vs Hoa hồng trong 8 kỳ gần nhất',
            revenue: 'Doanh thu',
            commission: 'Hoa hồng',
            liveActivity: 'Hoạt động trực tiếp',
            viewAll: 'Xem tất cả',
            justNow: 'Vừa xong',
            minutesAgo: 'phút trước',
            booked: 'đã đặt',
            modifiedReservation: 'đã sửa đặt chỗ',
            paidInvoice: 'đã thanh toán hóa đơn',
        },
        bookings: {
            title: 'Quản lý Đặt chỗ',
            subtitle: 'Xem và quản lý tất cả đặt chỗ sân golf',
            addBooking: 'Thêm đặt chỗ',
            exportData: 'Xuất dữ liệu',
            searchPlaceholder: 'Tìm kiếm theo tên khách hàng hoặc mã đặt chỗ...',
            filterAll: 'Tất cả',
            filterConfirmed: 'Đã xác nhận',
            filterPending: 'Chờ xử lý',
            filterCancelled: 'Đã hủy',
            tableId: 'ID',
            tableCustomer: 'Khách hàng',
            tableCourse: 'Sân golf',
            tableDate: 'Ngày',
            tableSlot: 'Giờ chơi',
            tablePlayers: 'Người chơi',
            tablePrice: 'Giá',
            tableStatus: 'Trạng thái',
            tablePayment: 'Thanh toán',
            tableActions: 'Hành động',
            statusConfirmed: 'Đã xác nhận',
            statusPending: 'Chờ xử lý',
            statusCancelled: 'Đã hủy',
            paymentPaid: 'Đã thanh toán',
            paymentPending: 'Chờ thanh toán',
            actionView: 'Xem',
            actionEdit: 'Sửa',
            actionCancel: 'Hủy',
        },
        clubs: {
            title: 'Quản lý Sân Golf',
            subtitle: 'Quản lý thông tin và cài đặt sân golf',
            addClub: 'Thêm sân golf',
            searchPlaceholder: 'Tìm kiếm sân golf...',
            viewDetails: 'Xem chi tiết',
            editClub: 'Chỉnh sửa',
            filterAll: 'Tất cả',
            totalHoles: 'Tổng số hố',
            holes: 'hố',
            par: 'Par',
            rating: 'Đánh giá',
            avgRating: 'Trung bình',
            reviews: 'đánh giá',
            bookingsToday: 'Đặt chỗ hôm nay',
            amenities: 'Tiện ích',
            statusMaintenance: 'Bảo trì',
            quickFilter: 'Lọc nhanh',
            clubhouse: 'Nhà câu lạc bộ',
            proShop: 'Cửa hàng chuyên nghiệp',
            restaurant: 'Nhà hàng',
            drivingRange: 'Sân tập',
            puttingGreen: 'Sân tập gạt',
            caddies: 'Caddie',
            carts: 'Xe golf',
            lockers: 'Tủ khóa',
        },
        users: {
            title: 'Quản lý Người dùng',
            subtitle: 'Quản lý tài khoản và quyền người dùng',
            addUser: 'Thêm người dùng',
            exportUsers: 'Xuất danh sách',
            searchPlaceholder: 'Tìm kiếm người dùng...',
            filterAll: 'Tất cả',
            filterAdmin: 'Quản trị viên',
            filterBroker: 'Môi giới',
            filterGolfer: 'Golfer',
            totalUsers: 'Tổng người dùng',
            activeAdmins: 'Admin hoạt động',
            managers: 'Quản lý',
            pendingInvites: 'Lời mời chờ',
            userProfile: 'Hồ sơ người dùng',
            noChange: 'Không thay đổi',
            actionNeeded: 'Cần xử lý',
            tableId: 'ID',
            tableName: 'Tên',
            tableEmail: 'Email',
            tableRole: 'Vai trò',
            tableBookings: 'Đặt chỗ',
            tableRevenue: 'Doanh thu',
            tableJoined: 'Tham gia',
            tableActions: 'Hành động',
            roleAdmin: 'Quản trị viên',
            roleBroker: 'Môi giới',
            roleGolfer: 'Golfer',
            roleStaff: 'Nhân viên',
            actionView: 'Xem',
            actionEdit: 'Sửa',
            actionDelete: 'Xóa',
        },
        slots: {
            title: 'Quản lý Slot thời gian',
            subtitle: 'Quản lý slot tee time cho tất cả sân golf',
            createSlot: 'Tạo slot',
            bulkUpload: 'Tải lên hàng loạt',
            selectCourse: 'Chọn sân golf',
            selectDate: 'Chọn ngày',
            timeSlot: 'Giờ chơi',
            capacity: 'Sức chứa',
            booked: 'Đã đặt',
            price: 'Giá',
            status: 'Trạng thái',
            actions: 'Hành động',
            statusAvailable: 'Còn chỗ',
            statusLimited: 'Sắp hết',
            statusFull: 'Đã đầy',
            statusClosed: 'Đóng',
            actionEdit: 'Sửa',
            actionClose: 'Đóng',
            actionOpen: 'Mở',
        },
        reports: {
            inventory: 'Kho hàng',
            stats: 'Thống kê',
        },
        header: {
            breadcrumb: 'Trang chủ / Bảng điều khiển',
            searchPlaceholder: 'Tìm kiếm đặt chỗ, sân golf hoặc người dùng...',
            notifications: 'Thông báo',
            adminName: 'Alex Morgan',
            adminRole: 'Quản trị hệ thống',
        },
        common: {
            save: 'Lưu',
            cancel: 'Hủy',
            delete: 'Xóa',
            edit: 'Sửa',
            view: 'Xem',
            search: 'Tìm kiếm',
            filter: 'Lọc',
            export: 'Xuất',
            import: 'Nhập',
            refresh: 'Làm mới',
            loading: 'Đang tải...',
            noData: 'Không có dữ liệu',
            confirm: 'Xác nhận',
            close: 'Đóng',
        },
    },
    ko: {
        nav: {
            dashboard: '대시보드',
            bookings: '예약',
            clubs: '골프장',
            slotManagement: '슬롯 관리',
            users: '사용자',
            reports: '보고서',
            inventory: '재고',
            finance: '재무',
            settings: '설정',
            logout: '로그아웃',
        },
        dashboard: {
            title: '대시보드 개요',
            subtitle: '오늘의 실시간 성능 지표 및 활동.',
            aiInsights: 'AI 인사이트',
            analyzing: '분석 중...',
            exportReport: '보고서 내보내기',
            performanceAnalysis: '성능 분석',
            totalRevenue: '총 수익',
            totalBookings: '총 예약',
            brokerCommission: '중개 수수료',
            activeCourses: '활성 코스',
            revenueAnalytics: '수익 분석',
            revenueSubtitle: '최근 8기간 동안의 수입 vs 수수료',
            revenue: '수익',
            commission: '수수료',
            liveActivity: '실시간 활동',
            viewAll: '모두 보기',
            justNow: '방금 전',
            minutesAgo: '분 전',
            booked: '예약함',
            modifiedReservation: '예약 수정함',
            paidInvoice: '송장 결제함',
        },
        bookings: {
            title: '예약 관리',
            subtitle: '모든 골프 예약 보기 및 관리',
            addBooking: '예약 추가',
            exportData: '데이터 내보내기',
            searchPlaceholder: '고객명 또는 예약 코드로 검색...',
            filterAll: '전체',
            filterConfirmed: '확정됨',
            filterPending: '대기 중',
            filterCancelled: '취소됨',
            tableId: 'ID',
            tableCustomer: '고객',
            tableCourse: '골프장',
            tableDate: '날짜',
            tableSlot: '티타임',
            tablePlayers: '플레이어',
            tablePrice: '가격',
            tableStatus: '상태',
            tablePayment: '결제',
            tableActions: '작업',
            statusConfirmed: '확정됨',
            statusPending: '대기 중',
            statusCancelled: '취소됨',
            paymentPaid: '결제 완료',
            paymentPending: '결제 대기',
            actionView: '보기',
            actionEdit: '수정',
            actionCancel: '취소',
        },
        clubs: {
            title: '골프장 관리',
            subtitle: '골프장 정보 및 설정 관리',
            addClub: '골프장 추가',
            searchPlaceholder: '골프장 검색...',
            viewDetails: '세부정보 보기',
            editClub: '수정',
            filterAll: '전체',
            totalHoles: '총 홀 수',
            holes: '홀',
            par: '파',
            rating: '평점',
            avgRating: '평균',
            reviews: '리뷰',
            bookingsToday: '오늘 예약',
            amenities: '편의시설',
            statusMaintenance: '유지보수',
            quickFilter: '빠른 필터',
            clubhouse: '클럽하우스',
            proShop: '프로샵',
            restaurant: '레스토랑',
            drivingRange: '드라이빙 레인지',
            puttingGreen: '퍼팅 그린',
            caddies: '캐디',
            carts: '골프 카트',
            lockers: '보관함',
        },
        users: {
            title: '사용자 관리',
            subtitle: '사용자 계정 및 권한 관리',
            addUser: '사용자 추가',
            exportUsers: '목록 내보내기',
            searchPlaceholder: '사용자 검색...',
            filterAll: '전체',
            filterAdmin: '관리자',
            filterBroker: '중개인',
            filterGolfer: '골퍼',
            totalUsers: '총 사용자',
            activeAdmins: '활성 관리자',
            managers: '매니저',
            pendingInvites: '대기 중인 초대',
            userProfile: '사용자 프로필',
            noChange: '변경 없음',
            actionNeeded: '조치 필요',
            tableId: 'ID',
            tableName: '이름',
            tableEmail: '이메일',
            tableRole: '역할',
            tableBookings: '예약',
            tableRevenue: '수익',
            tableJoined: '가입일',
            tableActions: '작업',
            roleAdmin: '관리자',
            roleBroker: '중개인',
            roleGolfer: '골퍼',
            roleStaff: '직원',
            actionView: '보기',
            actionEdit: '수정',
            actionDelete: '삭제',
        },
        slots: {
            title: '시간 슬롯 관리',
            subtitle: '모든 골프장의 티타임 슬롯 관리',
            createSlot: '슬롯 생성',
            bulkUpload: '대량 업로드',
            selectCourse: '골프장 선택',
            selectDate: '날짜 선택',
            timeSlot: '티타임',
            capacity: '수용인원',
            booked: '예약됨',
            price: '가격',
            status: '상태',
            actions: '작업',
            statusAvailable: '이용 가능',
            statusLimited: '거의 마감',
            statusFull: '만석',
            statusClosed: '마감',
            actionEdit: '수정',
            actionClose: '닫기',
            actionOpen: '열기',
        },
        reports: {
            inventory: '재고',
            stats: '통계',
        },
        header: {
            breadcrumb: '홈 / 대시보드',
            searchPlaceholder: '예약, 골프장 또는 사용자 검색...',
            notifications: '알림',
            adminName: 'Alex Morgan',
            adminRole: '시스템 관리자',
        },
        common: {
            save: '저장',
            cancel: '취소',
            delete: '삭제',
            edit: '수정',
            view: '보기',
            search: '검색',
            filter: '필터',
            export: '내보내기',
            import: '가져오기',
            refresh: '새로고침',
            loading: '로딩 중...',
            noData: '데이터 없음',
            confirm: '확인',
            close: '닫기',
        },
    },
    en: {
        nav: {
            dashboard: 'Dashboard',
            bookings: 'Bookings',
            clubs: 'Golf Clubs',
            slotManagement: 'Slot Management',
            users: 'Users',
            reports: 'Reports',
            inventory: 'Inventory',
            finance: 'Finance',
            settings: 'Settings',
            logout: 'Logout',
        },
        dashboard: {
            title: 'Dashboard Overview',
            subtitle: 'Real-time performance metrics and activity for today.',
            aiInsights: 'AI Insights',
            analyzing: 'Analyzing...',
            exportReport: 'Export Report',
            performanceAnalysis: 'Performance Analysis',
            totalRevenue: 'Total Revenue',
            totalBookings: 'Total Bookings',
            brokerCommission: 'Broker Commission',
            activeCourses: 'Active Courses',
            revenueAnalytics: 'Revenue Analytics',
            revenueSubtitle: 'Income vs Commission over last 8 periods',
            revenue: 'Revenue',
            commission: 'Commission',
            liveActivity: 'Live Activity',
            viewAll: 'View All',
            justNow: 'Just now',
            minutesAgo: 'min ago',
            booked: 'booked',
            modifiedReservation: 'modified reservation',
            paidInvoice: 'paid invoice',
        },
        bookings: {
            title: 'Booking Management',
            subtitle: 'View and manage all golf course bookings',
            addBooking: 'Add Booking',
            exportData: 'Export Data',
            searchPlaceholder: 'Search by customer name or booking code...',
            filterAll: 'All',
            filterConfirmed: 'Confirmed',
            filterPending: 'Pending',
            filterCancelled: 'Cancelled',
            tableId: 'ID',
            tableCustomer: 'Customer',
            tableCourse: 'Course',
            tableDate: 'Date',
            tableSlot: 'Tee Time',
            tablePlayers: 'Players',
            tablePrice: 'Price',
            tableStatus: 'Status',
            tablePayment: 'Payment',
            tableActions: 'Actions',
            statusConfirmed: 'Confirmed',
            statusPending: 'Pending',
            statusCancelled: 'Cancelled',
            paymentPaid: 'Paid',
            paymentPending: 'Pending',
            actionView: 'View',
            actionEdit: 'Edit',
            actionCancel: 'Cancel',
        },
        clubs: {
            title: 'Golf Club Management',
            subtitle: 'Manage golf course information and settings',
            addClub: 'Add Golf Club',
            searchPlaceholder: 'Search golf clubs...',
            viewDetails: 'View Details',
            editClub: 'Edit',
            filterAll: 'All',
            totalHoles: 'Total Holes',
            holes: 'holes',
            par: 'Par',
            rating: 'Rating',
            avgRating: 'Average',
            reviews: 'reviews',
            bookingsToday: 'Bookings Today',
            amenities: 'Amenities',
            statusMaintenance: 'Maintenance',
            quickFilter: 'Quick Filter',
            clubhouse: 'Clubhouse',
            proShop: 'Pro Shop',
            restaurant: 'Restaurant',
            drivingRange: 'Driving Range',
            puttingGreen: 'Putting Green',
            caddies: 'Caddies',
            carts: 'Golf Carts',
            lockers: 'Lockers',
        },
        users: {
            title: 'User Management',
            subtitle: 'Manage user accounts and permissions',
            addUser: 'Add User',
            exportUsers: 'Export Users',
            searchPlaceholder: 'Search users...',
            filterAll: 'All',
            filterAdmin: 'Admin',
            filterBroker: 'Broker',
            filterGolfer: 'Golfer',
            totalUsers: 'Total Users',
            activeAdmins: 'Active Admins',
            managers: 'Managers',
            pendingInvites: 'Pending Invites',
            userProfile: 'User Profile',
            noChange: 'No change',
            actionNeeded: 'Action needed',
            tableId: 'ID',
            tableName: 'Name',
            tableEmail: 'Email',
            tableRole: 'Role',
            tableBookings: 'Bookings',
            tableRevenue: 'Revenue',
            tableJoined: 'Joined',
            tableActions: 'Actions',
            roleAdmin: 'Admin',
            roleBroker: 'Broker',
            roleGolfer: 'Golfer',
            roleStaff: 'Staff',
            actionView: 'View',
            actionEdit: 'Edit',
            actionDelete: 'Delete',
        },
        slots: {
            title: 'Time Slot Management',
            subtitle: 'Manage tee time slots for all golf courses',
            createSlot: 'Create Slot',
            bulkUpload: 'Bulk Upload',
            selectCourse: 'Select Course',
            selectDate: 'Select Date',
            timeSlot: 'Time Slot',
            capacity: 'Capacity',
            booked: 'Booked',
            price: 'Price',
            status: 'Status',
            actions: 'Actions',
            statusAvailable: 'Available',
            statusLimited: 'Limited',
            statusFull: 'Full',
            statusClosed: 'Closed',
            actionEdit: 'Edit',
            actionClose: 'Close',
            actionOpen: 'Open',
        },
        reports: {
            inventory: 'Inventory',
            stats: 'Statistics',
        },
        header: {
            breadcrumb: 'Home / Dashboard',
            searchPlaceholder: 'Search bookings, courses, or users...',
            notifications: 'Notifications',
            adminName: 'Alex Morgan',
            adminRole: 'System Admin',
        },
        common: {
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            edit: 'Edit',
            view: 'View',
            search: 'Search',
            filter: 'Filter',
            export: 'Export',
            import: 'Import',
            refresh: 'Refresh',
            loading: 'Loading...',
            noData: 'No data',
            confirm: 'Confirm',
            close: 'Close',
        },
    },
};
