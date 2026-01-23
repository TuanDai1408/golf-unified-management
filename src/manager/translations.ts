// File dịch cho ClubManager - Hỗ trợ đa ngôn ngữ
// Translation file for ClubManager - Multilingual support

export type Language = 'vi' | 'ko' | 'en';

export interface Translations {
    nav: {
        teeSheet: string;
        staff: string;
        pricing: string;
        courses: string;
        reports: string;
        settings: string;
        logout: string;
        adminPortal: string;
    };
    header: {
        teeSheetTitle: string;
        staffTitle: string;
        pricingTitle: string;
        courseTitle: string;
        teeSheetSub: string;
        staffSub: string;
        pricingSub: string;
        courseSub: string;
        occupancy: string;
        revenue: string;
        newBooking: string;
        daily: string;
        weekly: string;
        list: string;
        searchPlayer: string;
    };
    staff: {
        searchPlaceholder: string;
        filter: string;
        export: string;
        tableUser: string;
        tableRole: string;
        tablePermissions: string;
        tableStatus: string;
        tableActions: string;
        statusActive: string;
        statusInactive: string;
        showingEntries: string;
        previous: string;
        next: string;
        activityLog: string;
        viewAll: string;
    };
    teeSheet: {
        legendConfirmed: string;
        legendPending: string;
        legendBlocked: string;
        lastUpdated: string;
        resources: string;
        unpaid: string;
        mowing: string;
        totalBookings: string;
        checkedIn: string;
        capacityLabel: string;
        nextTeeTime: string;
        inMinutes: string;
        autoRefresh: string;
        searchPlaceholder: string;
        allBookings: string;
        holes18: string;
        holes9: string;
        cartsOnly: string;
        vipMembers: string;
        tableTeeTime: string;
        tablePlayerName: string;
        tableDetails: string;
        tableRefId: string;
        tablePayment: string;
        tableStatus: string;
        tableActions: string;
        single: string;
        guests: string;
    };
    pricing: {
        title: string;
        subtitle: string;
        today: string;
        tomorrow: string;
        selectDates: string;
        unsavedChanges: string;
        unsavedSubtitle: string;
        discard: string;
        saveAll: string;
        tableTimeSlot: string;
        tableBaseRate: string;
        tablePartnerNet: string;
        tablePlatformFee: string;
        tableCustomerPrice: string;
        tableActions: string;
        closed: string;
        summaryTitle: string;
        avgBaseRate: string;
        lowestPrice: string;
        highestPrice: string;
        overridesTitle: string;
        addOverride: string;
    };
    course: {
        title: string;
        subtitle: string;
        draft: string;
        viewListing: string;
        generalInfo: string;
        courseName: string;
        aboutCourse: string;
        aboutPlaceholder: string;
        numHoles: string;
        holes9: string;
        holes18: string;
        holes36: string;
        par: string;
        operations: string;
        openingHours: string;
        to: string;
        cancelPolicy: string;
        publishing: string;
        publishChanges: string;
        saveDraft: string;
        lastSaved: string;
        photos: string;
        uploadLabel: string;
        uploadHint: string;
        uploading: string;
        proTip: string;
        proShopManager: string;
        address: string;
        maxPlayers: string;
        player: string;
        players: string;
        region: string;
        hanoi: string;
        daNang: string;
        hoChiMinh: string;
        weekdayPrice: string;
        weekendPrice: string;
        teeTimes: string;
        addTime: string;
        courseList: string;
        addNewCourse: string;
        refresh: string;
        searchPlaceholder: string;
        filterRegion: string;
        filterHoles: string;
        filterMaxPlayers: string;
        filterPriceRange: string;
        all: string;
        under2M: string;
        between2M3M: string;
        between3M4M: string;
        over4M: string;
        notAvailable: string;
        noCoursesFound: string;
        uploadingImages: string;
        courseUpdatedSuccess: string;
        coursePublished: string;
        draftSaved: string;
        pleaseUploadImage: string;
        failedToLoadCourses: string;
        errorOccurred: string;
        processing: string;
        weekday: string;
        weekend: string;
        maxPlayersLabel: string;
        holesLabel: string;
        enterCourseName: string;
        enterAddress: string;
        enterWeekdayPrice: string;
        enterWeekendPrice: string;
        deleteCourse: string;
        confirmDeleteTitle: string;
        confirmDeleteMessage: string;
        confirmDeleteWarning: string;
        courseDeletedSuccess: string;
        deleteFailed: string;
        status: string;
        active: string;
        inactive: string;
        saveChanges: string;
    };
    common: {
        loading: string;
        error: string;
        success: string;
        save: string;
        cancel: string;
        delete: string;
        edit: string;
        view: string;
    };
}

export const translations: Record<Language, Translations> = {
    vi: {
        nav: {
            teeSheet: 'Bảng giờ chơi',
            staff: 'Quản lý nhân viên',
            pricing: 'Bảng giá',
            courses: 'Thông tin sân',
            reports: 'Báo cáo',
            settings: 'Cài đặt',
            logout: 'Đăng xuất',
            adminPortal: 'Cổng Admin',
        },
        header: {
            teeSheetTitle: 'Bảng giờ chơi hàng ngày',
            staffTitle: 'Quản lý nhân viên',
            pricingTitle: 'Giá bảng giờ chơi',
            courseTitle: 'Chi tiết sân golf',
            teeSheetSub: 'Quản lý đặt chỗ và tình trạng sân',
            staffSub: 'Quản lý vai trò, sửa quyền và giám sát hoạt động tài khoản.',
            pricingSub: 'Quản lý giá cơ bản và giá sự kiện đặc biệt.',
            courseSub: 'Quản lý thông tin sân, hình ảnh và chính sách.',
            occupancy: 'Tỷ lệ lấp đầy',
            revenue: 'Doanh thu',
            newBooking: 'Đặt chỗ mới',
            daily: 'Hàng ngày',
            weekly: 'Hàng tuần',
            list: 'Danh sách',
            searchPlayer: 'Tìm người chơi...',
        },
        staff: {
            searchPlaceholder: 'Tìm kiếm theo tên, email hoặc vai trò...',
            filter: 'Lọc',
            export: 'Xuất',
            tableUser: 'Người dùng',
            tableRole: 'Vai trò',
            tablePermissions: 'Quyền hạn',
            tableStatus: 'Trạng thái',
            tableActions: 'Hành động',
            statusActive: 'Đang hoạt động',
            statusInactive: 'Ngừng hoạt động',
            showingEntries: 'Hiển thị {count} trên {total} mục',
            previous: 'Trước',
            next: 'Sau',
            activityLog: 'Nhật ký hoạt động',
            viewAll: 'Xem tất cả',
        },
        teeSheet: {
            legendConfirmed: 'Đã xác nhận',
            legendPending: 'Chờ xử lý',
            legendBlocked: 'Bị khóa/Bảo trì',
            lastUpdated: 'Cập nhật cuối: Vừa xong',
            resources: 'Tài nguyên',
            unpaid: 'Chưa thanh toán',
            mowing: 'Đang cắt cỏ',
            totalBookings: 'Tổng đặt chỗ',
            checkedIn: 'Đã check-in',
            capacityLabel: '{percent}% công suất hàng ngày',
            nextTeeTime: 'Giờ chơi tiếp theo',
            inMinutes: 'Trong {min} phút',
            autoRefresh: 'Tự động tải lại',
            searchPlaceholder: 'Tìm kiếm tên người chơi hoặc mã đặt chỗ...',
            allBookings: 'Tất cả đặt chỗ',
            holes18: '18 Hố',
            holes9: '9 Hố',
            cartsOnly: 'Chỉ xe Golf',
            vipMembers: 'Thành viên VIP',
            tableTeeTime: 'Giờ chơi',
            tablePlayerName: 'Tên người chơi',
            tableDetails: 'Chi tiết',
            tableRefId: 'Mã Ref',
            tablePayment: 'Thanh toán',
            tableStatus: 'Trạng thái',
            tableActions: 'Hành động',
            single: 'Chơi đơn',
            guests: '+ {count} khách',
        },
        pricing: {
            title: 'Giá bảng giờ chơi',
            subtitle: 'Quản lý giá cơ bản và giá sự kiện đặc biệt.',
            today: 'Hôm nay',
            tomorrow: 'Ngày mai',
            selectDates: 'Chọn ngày',
            unsavedChanges: 'Thay đổi chưa lưu',
            unsavedSubtitle: 'Bạn đã thay đổi {count} slot giá hôm nay.',
            discard: 'Hủy bỏ',
            saveAll: 'Lưu tất cả thay đổi',
            tableTimeSlot: 'Slot thời gian',
            tableBaseRate: 'Giá cơ bản ($)',
            tablePartnerNet: 'Partner Net',
            tablePlatformFee: 'Phí nền tảng',
            tableCustomerPrice: 'Giá khách hàng',
            tableActions: 'Hành động',
            closed: 'Đã đóng',
            summaryTitle: 'Tóm tắt giá',
            avgBaseRate: 'Giá cơ bản trung bình',
            lowestPrice: 'Giá thấp nhất',
            highestPrice: 'Giá cao nhất',
            overridesTitle: 'Các quy tắc đặc biệt sắp tới',
            addOverride: 'Thêm quy tắc mới',
        },
        course: {
            title: 'Chi tiết sân golf',
            subtitle: 'Quản lý thông tin sân, hình ảnh và chính sách.',
            draft: 'Bản nháp',
            viewListing: 'Xem danh sách',
            generalInfo: 'Thông tin chung',
            courseName: 'Tên sân golf',
            aboutCourse: 'Giới thiệu về sân',
            aboutPlaceholder: 'Ví dụ: Nằm giữa những ngọn đồi nhấp nhô...',
            numHoles: 'Số hố',
            holes9: '9 Hố',
            holes18: '18 Hố',
            holes36: '36 Hố',
            par: 'Par',
            operations: 'Vận hành & Chính sách',
            openingHours: 'Giờ mở cửa hàng ngày',
            to: 'đến',
            cancelPolicy: 'Chính sách hủy bỏ',
            publishing: 'Xuất bản',
            publishChanges: 'Xuất bản thay đổi',
            saveDraft: 'Lưu bản nháp',
            lastSaved: 'Lưu cuối: {time}',
            photos: 'Hình ảnh sân',
            uploadLabel: 'Click hoặc kéo thả ảnh',
            uploadHint: 'JPG, PNG tối đa 5MB',
            uploading: 'Đang tải lên...',
            proTip: 'Mẹo: Ảnh chất lượng cao của các hố đặc trưng giúp tăng tỉ lệ đặt sân lên đến 20%.',
            proShopManager: 'Quản lý Pro Shop',
            address: 'Địa chỉ',
            maxPlayers: 'Số người chơi tối đa',
            player: 'Người chơi',
            players: 'Người chơi',
            region: 'Vùng miền',
            hanoi: 'Hà Nội',
            daNang: 'Đà Nẵng',
            hoChiMinh: 'Hồ Chí Minh',
            weekdayPrice: 'Giá ngày thường (VND)',
            weekendPrice: 'Giá cuối tuần (VND)',
            teeTimes: 'Danh sách giờ chơi',
            addTime: 'Thêm giờ',
            courseList: 'Danh sách sân golf',
            addNewCourse: 'Thêm sân mới',
            refresh: 'Làm mới',
            searchPlaceholder: 'Tìm kiếm theo tên hoặc địa chỉ...',
            filterRegion: 'Vùng miền',
            filterHoles: 'Số lỗ',
            filterMaxPlayers: 'Số người chơi',
            filterPriceRange: 'Mức giá',
            all: 'Tất cả',
            under2M: 'Dưới 2 triệu',
            between2M3M: '2 - 3 triệu',
            between3M4M: '3 - 4 triệu',
            over4M: 'Trên 4 triệu',
            notAvailable: 'Chưa có',
            noCoursesFound: 'Không tìm thấy sân golf nào',
            uploadingImages: 'Đang tải lên {count} hình ảnh...',
            courseUpdatedSuccess: 'Cập nhật sân golf thành công',
            coursePublished: 'Đã xuất bản sân golf',
            draftSaved: 'Đã lưu bản nháp',
            pleaseUploadImage: 'Vui lòng tải lên ít nhất một hình ảnh',
            failedToLoadCourses: 'Không thể tải danh sách sân golf',
            errorOccurred: 'Có lỗi xảy ra',
            processing: 'Đang xử lý...',
            weekday: 'Ngày thường',
            weekend: 'Cuối tuần',
            maxPlayersLabel: 'Tối đa {count} người',
            holesLabel: '{count} lỗ',
            enterCourseName: 'Nhập tên sân golf',
            enterAddress: 'Nhập địa chỉ',
            enterWeekdayPrice: 'Giá ngày thường (VND)',
            enterWeekendPrice: 'Giá cuối tuần (VND)',
            deleteCourse: 'Xóa sân golf',
            confirmDeleteTitle: 'Xác nhận xóa sân golf',
            confirmDeleteMessage: 'Bạn có chắc chắn muốn xóa sân golf "{name}" không?',
            confirmDeleteWarning: 'Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan đến sân golf này sẽ bị xóa vĩnh viễn.',
            courseDeletedSuccess: 'Đã xóa sân golf thành công',
            deleteFailed: 'Không thể xóa sân golf',
            status: 'Trạng thái',
            active: 'Đang hoạt động',
            inactive: 'Ngừng hoạt động',
            saveChanges: 'Lưu thay đổi',
        },
        common: {
            loading: 'Đang tải...',
            error: 'Lỗi',
            success: 'Thành công',
            save: 'Lưu',
            cancel: 'Hủy',
            delete: 'Xóa',
            edit: 'Sửa',
            view: 'Xem',
        },
    },
    ko: {
        nav: {
            teeSheet: '티 시트',
            staff: '직원 관리',
            pricing: '가격 관리',
            courses: '코스 정보',
            reports: '보고서',
            settings: '설정',
            logout: '로그아웃',
            adminPortal: '관리자 포털',
        },
        header: {
            teeSheetTitle: '일일 티 시트',
            staffTitle: '직원 관리',
            pricingTitle: '티 시트 가격',
            courseTitle: '코스 세부 정보',
            teeSheetSub: '예약 및 코스 가용성 관리',
            staffSub: '사용자 역할 관리, 권한 수정 및 계정 활동 모니터링.',
            pricingSub: '기본 요금 및 특별 이벤트 요령 관리.',
            courseSub: '코스 정보, 사진 및 정책 관리.',
            occupancy: '점유율',
            revenue: '수익',
            newBooking: '새 예약',
            daily: '일간',
            weekly: '주간',
            list: '목록',
            searchPlayer: '플레이어 검색...',
        },
        staff: {
            searchPlaceholder: '이름, 이메일 또는 역할로 검색...',
            filter: '필터',
            export: '내보내기',
            tableUser: '사용자',
            tableRole: '역할',
            tablePermissions: '권한',
            tableStatus: '상태',
            tableActions: '작업',
            statusActive: '활성',
            statusInactive: '비활성',
            showingEntries: '{total}개 중 {count}개 표시',
            previous: '이전',
            next: '다음',
            activityLog: '활동 로그',
            viewAll: '모두 보기',
        },
        teeSheet: {
            legendConfirmed: '확정됨',
            legendPending: '대기 중',
            legendBlocked: '차단됨/보수 중',
            lastUpdated: '최종 업데이트: 방금 전',
            resources: '리소스',
            unpaid: '미납',
            mowing: '잔디 깎는 중',
            totalBookings: '총 예약',
            checkedIn: '체크인 완료',
            capacityLabel: '일일 수용 인원의 {percent}%',
            nextTeeTime: '다음 티타임',
            inMinutes: '{min}분 후',
            autoRefresh: '자동 새로고침',
            searchPlaceholder: '플레이어 이름 또는 예약 코드로 검색...',
            allBookings: '모든 예약',
            holes18: '18홀',
            holes9: '9홀',
            cartsOnly: '카트 전용',
            vipMembers: 'VIP 회원',
            tableTeeTime: '티타임',
            tablePlayerName: '플레이어 이름',
            tableDetails: '상세 정보',
            tableRefId: '참조 ID',
            tablePayment: '결제',
            tableStatus: '상태',
            tableActions: '작업',
            single: '싱글',
            guests: '+ {count}명의 게스트',
        },
        pricing: {
            title: '티 시트 요금 설정',
            subtitle: '기본 요금 및 특별 이벤트 적용 관리.',
            today: '오늘',
            tomorrow: '내일',
            selectDates: '날짜 선택',
            unsavedChanges: '저장되지 않은 변경 사항',
            unsavedSubtitle: '오늘의 {count}개 요금 슬롯을 수정했습니다.',
            discard: '삭제',
            saveAll: '모든 변경 사항 저장',
            tableTimeSlot: '시간 슬롯',
            tableBaseRate: '기본 요금 ($)',
            tablePartnerNet: '파트너 넷',
            tablePlatformFee: '플랫폼 수수료',
            tableCustomerPrice: '고객 가격',
            tableActions: '작업',
            closed: '마감',
            summaryTitle: '요금 요약',
            avgBaseRate: '평균 기본 요금',
            lowestPrice: '최저가',
            highestPrice: '최고가',
            overridesTitle: '예정된 특별 요금 적용',
            addOverride: '새 규칙 추가',
        },
        course: {
            title: '코스 세부 정보',
            subtitle: '코스 정보, 사진 및 정책 관리.',
            draft: '임시 저장',
            viewListing: '목록 보기',
            generalInfo: '일반 정보',
            courseName: '코스 이름',
            aboutCourse: '코스 정보',
            aboutPlaceholder: '예: 완만한 언덕 사이에 위치한...',
            numHoles: '홀 수',
            holes9: '9홀',
            holes18: '18홀',
            holes36: '36홀',
            par: '파',
            operations: '운영 및 정책',
            openingHours: '일일 운영 시간',
            to: '까지',
            cancelPolicy: '취소 정책',
            publishing: '게시',
            publishChanges: '변경 사항 게시',
            saveDraft: '임시 저장',
            lastSaved: '최종 저장: {time}',
            photos: '코스 사진',
            uploadLabel: '이미지를 클릭하거나 드래그하세요',
            uploadHint: 'JPG, PNG 최대 5MB',
            uploading: '업로드 중...',
            proTip: '팁: 시그니처 홀의 고화질 사진은 예약률을 최대 20%까지 높입니다.',
            proShopManager: '프로샵 매니저',
            address: '주소',
            maxPlayers: '최대 플레이어 수',
            player: '인',
            players: '인',
            region: '지역',
            hanoi: '하노이',
            daNang: '다낭',
            hoChiMinh: '호치민',
            weekdayPrice: '평일 요금 (VND)',
            weekendPrice: '주말 요금 (VND)',
            teeTimes: '티타임 목록',
            addTime: '시간 추가',
            courseList: '골프장 목록',
            addNewCourse: '새 골프장 추가',
            refresh: '새로고침',
            searchPlaceholder: '이름 또는 주소로 검색...',
            filterRegion: '지역',
            filterHoles: '홀 수',
            filterMaxPlayers: '최대 플레이어 수',
            filterPriceRange: '가격 범위',
            all: '전체',
            under2M: '2백만원 미만',
            between2M3M: '2백만원 - 3백만원',
            between3M4M: '3백만원 - 4백만원',
            over4M: '4백만원 이상',
            notAvailable: '없음',
            noCoursesFound: '골프장을 찾을 수 없습니다',
            uploadingImages: '{count}개의 이미지 업로드 중...',
            courseUpdatedSuccess: '골프장 업데이트 성공',
            coursePublished: '골프장 게시됨',
            draftSaved: '임시 저장됨',
            pleaseUploadImage: '최소 하나의 이미지를 업로드해주세요',
            failedToLoadCourses: '골프장 목록을 불러올 수 없습니다',
            errorOccurred: '오류가 발생했습니다',
            processing: '처리 중...',
            weekday: '평일',
            weekend: '주말',
            maxPlayersLabel: '최대 {count}명',
            holesLabel: '{count}홀',
            enterCourseName: '골프장 이름 입력',
            enterAddress: '주소 입력',
            enterWeekdayPrice: '평일 요금 (VND)',
            enterWeekendPrice: '주말 요금 (VND)',
            deleteCourse: '골프장 삭제',
            confirmDeleteTitle: '골프장 삭제 확인',
            confirmDeleteMessage: '"{name}" 골프장을 정말 삭제하시겠습니까?',
            confirmDeleteWarning: '이 작업은 되돌릴 수 없습니다. 이 골프장과 관련된 모든 데이터가 영구적으로 삭제됩니다.',
            courseDeletedSuccess: '골프장이 성공적으로 삭제되었습니다',
            deleteFailed: '골프장을 삭제할 수 없습니다',
            status: '상태',
            active: '활성',
            inactive: '비활성',
            saveChanges: '변경 사항 저장',
        },
        common: {
            loading: '로딩 중...',
            error: '오류',
            success: '성공',
            save: '저장',
            cancel: '취소',
            delete: '삭제',
            edit: '수정',
            view: '보기',
        },
    },
    en: {
        nav: {
            teeSheet: 'Tee Sheet',
            staff: 'Staff Management',
            pricing: 'Pricing',
            courses: 'Course Info',
            reports: 'Reports',
            settings: 'Settings',
            logout: 'Logout',
            adminPortal: 'Admin Portal',
        },
        header: {
            teeSheetTitle: 'Daily Tee Sheet',
            staffTitle: 'Staff Management',
            pricingTitle: 'Tee Sheet Pricing',
            courseTitle: 'Course Details',
            teeSheetSub: 'Manage bookings and course availability',
            staffSub: 'Manage user roles, modify permissions, and monitor recent account activity securely.',
            pricingSub: 'Manage your base rates and override special events.',
            courseSub: 'Manage your course information, photos, and policies.',
            occupancy: 'Occupancy',
            revenue: 'Revenue',
            newBooking: 'New Booking',
            daily: 'Daily',
            weekly: 'Weekly',
            list: 'List',
            searchPlayer: 'Search player...',
        },
        staff: {
            searchPlaceholder: 'Search by name, email, or role...',
            filter: 'Filter',
            export: 'Export',
            tableUser: 'User',
            tableRole: 'Role',
            tablePermissions: 'Permissions',
            tableStatus: 'Status',
            tableActions: 'Actions',
            statusActive: 'Active',
            statusInactive: 'Inactive',
            showingEntries: 'Showing {count} of {total} entries',
            previous: 'Previous',
            next: 'Next',
            activityLog: 'Activity Log',
            viewAll: 'View All',
        },
        teeSheet: {
            legendConfirmed: 'Confirmed',
            legendPending: 'Pending',
            legendBlocked: 'Blocked/Maint',
            lastUpdated: 'Last updated: Just now',
            resources: 'Resources',
            unpaid: 'Unpaid',
            mowing: 'Mowing',
            totalBookings: 'Total Bookings',
            checkedIn: 'Checked In',
            capacityLabel: '{percent}% of daily capacity',
            nextTeeTime: 'Next Tee Time',
            inMinutes: 'In {min} minutes',
            autoRefresh: 'Auto-refresh',
            searchPlaceholder: 'Search player name or booking ref...',
            allBookings: 'All Bookings',
            holes18: '18 Holes',
            holes9: '9 Holes',
            cartsOnly: 'Carts Only',
            vipMembers: 'VIP Members',
            tableTeeTime: 'Tee Time',
            tablePlayerName: 'Player Name',
            tableDetails: 'Details',
            tableRefId: 'Ref ID',
            tablePayment: 'Payment',
            tableStatus: 'Status',
            tableActions: 'Actions',
            single: 'Single',
            guests: '+ {count} Guests',
        },
        pricing: {
            title: 'Tee Sheet Pricing',
            subtitle: 'Manage your base rates and override special events.',
            today: 'Today',
            tomorrow: 'Tomorrow',
            selectDates: 'Select Dates',
            unsavedChanges: 'Unsaved Changes',
            unsavedSubtitle: 'You have modified {count} pricing slots for today.',
            discard: 'Discard',
            saveAll: 'Save All Changes',
            tableTimeSlot: 'Time Slot',
            tableBaseRate: 'Base Rate ($)',
            tablePartnerNet: 'Partner Net',
            tablePlatformFee: 'Platform Fee',
            tableCustomerPrice: 'Customer Price',
            tableActions: 'Actions',
            closed: 'Closed',
            summaryTitle: 'Pricing Summary',
            avgBaseRate: 'Average Base Rate',
            lowestPrice: 'Lowest Price',
            highestPrice: 'Highest Price',
            overridesTitle: 'Upcoming Special Overrides',
            addOverride: 'Add New Override Rule',
        },
        course: {
            title: 'Course Details',
            subtitle: 'Manage your course information, photos, and policies.',
            draft: 'Draft',
            viewListing: 'View Listing',
            generalInfo: 'General Information',
            courseName: 'Course Name',
            aboutCourse: 'About the Course',
            aboutPlaceholder: 'e.g. Nestled in the rolling hills...',
            numHoles: 'Number of Holes',
            holes9: '9 Holes',
            holes18: '18 Holes',
            holes36: '36 Holes',
            par: 'Par',
            operations: 'Operations & Policies',
            openingHours: 'Daily Opening Hours',
            to: 'to',
            cancelPolicy: 'Cancellation Policy',
            publishing: 'Publishing',
            publishChanges: 'Publish Changes',
            saveDraft: 'Save Draft',
            lastSaved: 'Last saved: {time}',
            photos: 'Course Photos',
            uploadLabel: 'Click or drag images',
            uploadHint: 'JPG, PNG up to 5MB',
            uploading: 'Uploading...',
            proTip: 'Pro Tip: High-quality photos of signature holes increase booking rates by up to 20%.',
            proShopManager: 'Pro Shop Manager',
            address: 'Address',
            maxPlayers: 'Maximum Players',
            player: 'Player',
            players: 'Players',
            region: 'Region',
            hanoi: 'Hanoi',
            daNang: 'Da Nang',
            hoChiMinh: 'Ho Chi Minh',
            weekdayPrice: 'Weekday Price (VND)',
            weekendPrice: 'Weekend Price (VND)',
            teeTimes: 'Tee Times',
            addTime: 'Add Time',
            courseList: 'Course List',
            addNewCourse: 'Add New Course',
            refresh: 'Refresh',
            searchPlaceholder: 'Search by name or address...',
            filterRegion: 'Region',
            filterHoles: 'Number of Holes',
            filterMaxPlayers: 'Max Players',
            filterPriceRange: 'Price Range',
            all: 'All',
            under2M: 'Under 2M',
            between2M3M: '2M - 3M',
            between3M4M: '3M - 4M',
            over4M: 'Over 4M',
            notAvailable: 'Not Available',
            noCoursesFound: 'No courses found',
            uploadingImages: 'Uploading {count} images...',
            courseUpdatedSuccess: 'Course updated successfully',
            coursePublished: 'Course published',
            draftSaved: 'Draft saved',
            pleaseUploadImage: 'Please upload at least one image',
            failedToLoadCourses: 'Failed to load courses',
            errorOccurred: 'An error occurred',
            processing: 'Processing...',
            weekday: 'Weekday',
            weekend: 'Weekend',
            maxPlayersLabel: 'Max {count} players',
            holesLabel: '{count} holes',
            enterCourseName: 'Enter course name',
            enterAddress: 'Enter address',
            enterWeekdayPrice: 'Weekday price (VND)',
            enterWeekendPrice: 'Weekend price (VND)',
            deleteCourse: 'Delete Course',
            confirmDeleteTitle: 'Confirm Delete Course',
            confirmDeleteMessage: 'Are you sure you want to delete the course "{name}"?',
            confirmDeleteWarning: 'This action cannot be undone. All data related to this course will be permanently deleted.',
            courseDeletedSuccess: 'Course deleted successfully',
            deleteFailed: 'Failed to delete course',
            status: 'Status',
            active: 'Active',
            inactive: 'Inactive',
            saveChanges: 'Save Changes',
        },
        common: {
            loading: 'Loading...',
            error: 'Error',
            success: 'Success',
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            edit: 'Edit',
            view: 'View',
        },
    },
};
